import express from 'express';
import { OrderRepository } from '../lib/category/OrderRepository';
import { ProductRepository } from '../lib/category/ProductRepository';

const orderRepository = new OrderRepository();

const router = express.Router();

const MAX_DISTANCE_FILTER_FIELD: number = 20;

router.get('/users/:user', async function (req, res, next) {
    const userId = Number(req.params.user);

    res.send(await orderRepository.getByUser(userId));
});

router.get('/:order', async function (req, res, next) {
    const orderId = Number(req.params.order);

    res.send(await orderRepository.getOrderDetail(orderId));
});

router.post('/users/:user', async function (req, res, next) {
    const order = req.body;
    const userId = Number(req.params.user);

    
    order.price = order.products.reduce((priceSum: number, productTmp: any) => priceSum + productTmp.price * productTmp.quantity, 0);
    res.send(await orderRepository.createOrder(order, userId));
});

router.get('/:order/products', async function (req, res, next) {
    const orderId = Number(req.params.order);

    res.send(await orderRepository.getProductsByOrder(orderId));
});

export default router;