import express from 'express';
import { OrderRepository } from '../lib/category/OrderRepository';

const orderRepository = new OrderRepository();

const router = express.Router();

const MAX_DISTANCE_FILTER_FIELD: number = 20;

router.get('/users/:user', async function (req, res, next) {
    const userId = Number(req.params.user);

    res.send(await orderRepository.getByUser(userId));
})

router.get('/:order', async function (req, res, next) {
    const orderId = Number(req.params.order);

    res.send(await orderRepository.getOrderDetail(orderId));
})

router.get('/:order/products', async function (req, res, next) {
    const orderId = Number(req.params.order);

    res.send(await orderRepository.getProductsByOrder(orderId));
})

export default router;