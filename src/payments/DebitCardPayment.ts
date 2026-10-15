import logger from '../lib/logger'
import { IPaymentMethod } from './IPaymentMethod'

export class DebitCardPayment implements IPaymentMethod {
    process(paymentDetails: any): void{
        logger.info('Processando débito...')
    }
}