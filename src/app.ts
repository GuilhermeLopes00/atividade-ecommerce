import express from 'express';
import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/OrderService';
import { NotificationService } from './services/NotificationService';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { EtherealMailProvider } from './providers/EtherealMailProvider';
import { CreditCardPayment } from './payments/CreditCardPayment';
import { DebitCardPayment } from './payments/DebitCardPayment';
import { PixPayment } from './payments/PixPayment';

const app = express();
app.use(express.json());

const orderRepository = new PrismaOrderRepository();
const notificationService = new NotificationService(new EtherealMailProvider());
const paymentMethods = {
    credit_card: new CreditCardPayment(),
    debit_card: new DebitCardPayment(),
    pix: new PixPayment(),
};

const orderService = new OrderService(orderRepository, paymentMethods, notificationService);
const orderController = new OrderController(orderService);

app.post('/orders', (req, res) => orderController.processOrder(req, res));

export default app;
