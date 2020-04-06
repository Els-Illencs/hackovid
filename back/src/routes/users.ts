import express from 'express';
import { UsersRepository } from '../lib/users/UsersRepository';

const usersRepository = new UsersRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    res.send(await usersRepository.getAll());
})

export default router;