import express from 'express';
import crypto from 'crypto';
import { UserRepository } from '../lib/category/UserRepository';
import { ProductRepository } from '../lib/category/ProductRepository';
import { OrderRepository } from '../lib/category/OrderRepository';

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

const router = express.Router();

const secret = 'abcdefg';

router.post('/register', async function (req, res, next) {
    const user = req.body;
    user.password = getHashPassword(user.password);

    const userRes = await userRepository.addUser(user);

    const products = (await productRepository.get(null, null, null, null, null, null, null)).splice(0, 5);

    orderRepository.createOrder({
        type: 1,
        trackingStage: 5,
        isPaid: true,
        rating: 4,
        products: products.map(({ id }, index) => {
            return {
                id,
                quantity: index
            }
        }),
    }, userRes.id);

    res.send(userRes);
});

router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;
    res.send(await userRepository.getUser(email, getHashPassword(password)));
});

const getHashPassword = (password: string) => crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

export default router;