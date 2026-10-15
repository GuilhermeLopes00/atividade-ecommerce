import { PrismaClient } from '@prisma/client'
import { IOrderRepository } from './IOrderRepository'

export class PrismaOrderRepository implements IOrderRepository {
    private prisma = new PrismaClient()

    findProduct(id: number) {
        return this.prisma.product.findUnique({ where: {id} })
    }

    create(customer: string, items: string, total: number, status: string) {
        return this.prisma.order.create({ 
            data: {customer, items, total, status} 
        })
    }
}
