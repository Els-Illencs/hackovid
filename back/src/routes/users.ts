import express from 'express';
import { UserRepository } from '../lib/category/UserRepository';

const userRepository = new UserRepository();

const router = express.Router();

router.post('/register', async function (req, res, next) {
    const user = req.body;

    res.send(await userRepository.addUser(user));
});

router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;

    res.send(await userRepository.getUser(email, password));
});


export default router;