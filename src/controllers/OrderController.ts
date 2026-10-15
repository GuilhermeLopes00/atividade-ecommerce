import { Request, Response } from 'express';
import logger from '../lib/logger';
import { OrderService } from '../services/OrderService';

export class OrderController {
    private orderService: OrderService

    constructor(orderService: OrderService){
        this.orderService = orderService
    }

    async processOrder(req: Request, res: Response) {
        try {
            const { orderId, emailPreview } = await this.orderService.processOrder(req.body);

            return res.json({
                message: 'Pedido processado com sucesso',
                orderId,
                emailPreview
            });

        } catch (error: any) {
            logger.error(`Erro ao processar pedido: ${error.message}`);
            return res.status(400).json({ error: 'Erro interno' });
        }
    }
}
