import express from 'express';
import { OrderRepository } from '../lib/category/OrderRepository';

const orderRepository = new OrderRepository();

const router = express.Router();

const MAX_DISTANCE_FILTER_FIELD: number = 20;

router.get('/', async function (req, res, next) {
    const userId = Number(req.query.userId);


    res.send(await orderRepository.getByUser(userId));
})

router.get('', async function (req, res, next) {
    const orderId = Number(req.query.orderId);

    res.send(await orderRepository.getOrderDetail(orderId));
})

router.get('/', async function (req, res, next) {
    const orderId = Number(req.query.orderId);

    res.send(await orderRepository.getProductsByOrder(orderId));
})

export default router;