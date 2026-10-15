import { IMailProvider } from '../providers/IMailProvider'

export class NotificationService {
    private mailProvider: IMailProvider

    constructor(mailProvider: IMailProvider) {
        this.mailProvider = mailProvider
    }

    sendOrderConfirmation(customer: string, orderId: number, totalAmount: number, productNames: string[]): Promise<string | false> {
        return this.mailProvider.sendMail({
            from: '"DevStore" <noreply@devstore.com>',
            to: customer,
            subject: `Confirmação do Pedido #${orderId}`,
            text: `Olá, seu pedido #${orderId} no valor de R$ ${totalAmount} foi confirmado.`,
            html: `
                <h1>Pedido Confirmado!</h1>
                <p>Olá, seu pedido <b>#${orderId}</b> foi processado com sucesso.</p>
                <p>Total: <strong>R$ ${totalAmount}</strong></p>
                <ul> ${productNames.map(name => `<li>${name}</li>`).join('')} </ul>`,
        })
    }
}
