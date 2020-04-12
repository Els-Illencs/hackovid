import express from 'express';
import crypto from 'crypto';
import { UserRepository } from '../lib/category/UserRepository';

const userRepository = new UserRepository();

const router = express.Router();

const secret = 'abcdefg';

router.post('/register', async function (req, res, next) {
    const user = req.body;
    user.password = getHashPassword(user.password);

    res.send(await userRepository.addUser(user));
});

router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;
    res.send(await userRepository.getUser(email, getHashPassword(password)));
});

const getHashPassword = (password: string) => crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

export default router;