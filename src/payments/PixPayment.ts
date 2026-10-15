import logger from '../lib/logger'
import { IPaymentMethod } from './IPaymentMethod'

export class PixPayment implements IPaymentMethod {
    process(paymentDetails: any): void{
        logger.info('Processando Pix...')
    }
}
