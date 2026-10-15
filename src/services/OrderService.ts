import logger from '../lib/logger'
import { ProductFactory } from '../domain/ProductFactory'
import { IOrderRepository } from '../repositories/IOrderRepository'
import { IPaymentMethod } from '../payments/IPaymentMethod'
import { NotificationService } from './NotificationService'

export interface OrderRequest {
    customer: string
    items: { productId: number, quantity: number }[]
    paymentMethod: string
    paymentDetails: any
}

export interface OrderResult {
    orderId: number
    emailPreview: string | false
}

export class OrderService {
    private orderRepository: IOrderRepository
    private paymentMethods: Record<string, IPaymentMethod>
    private notificationService: NotificationService

    constructor( orderRepository: IOrderRepository, paymentMethods: Record<string, IPaymentMethod>, notificationService: NotificationService){
            this.orderRepository = orderRepository
            this.paymentMethods = paymentMethods
            this.notificationService = notificationService
        }

    async processOrder({ customer, items, paymentMethod, paymentDetails }: OrderRequest){
        if (!items || items.length === 0) {
            logger.error('Tentativa de pedido sem itens');
            throw new Error ('Carrinho vazio')
        }

        let totalAmount = 0
        const productsDetails = []

        for (const item of items) {
            const productData = await this.orderRepository.findProduct(item.productId)

            if (!productData) {
                throw new Error (`Produto ${item.productId} não encontrado`)
            }

            const product = ProductFactory.createProduct(productData)
            totalAmount += product.price * item.quantity
            totalAmount += product.calculateFreight()

            productsDetails.push({ ...productData, quantity: item.quantity })
        }

        const payment = this.paymentMethods[paymentMethod]
        if (!payment) {
            throw new Error ('Método de pagamento não suportado')
        }
        payment.process(paymentDetails)

        const order = await this.orderRepository.create(
            customer,
            JSON.stringify(productsDetails),
            totalAmount,
            'confirmed'
        )

        const emailPreview = await this.notificationService.sendOrderConfirmation(
            customer,
            order.id,
            totalAmount,
            productsDetails.map(p => p.name)
        )

        return { orderId: order.id, emailPreview }
    }
}
