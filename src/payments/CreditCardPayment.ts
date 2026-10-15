import logger from '../lib/logger'
import { IPaymentMethod } from './IPaymentMethod'

export class CreditCardPayment implements IPaymentMethod {
    process(paymentDetails: any): void {
        logger.info(`Processando cartão final ${paymentDetails.cardNumber.slice(-4)}`)
        if (paymentDetails.cvv === '000') 
            throw new Error('Cartão recusado')
    }
}
