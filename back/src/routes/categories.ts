import express from 'express';
import { CategoryRepository } from '../lib/category/CategoryRepository';

const categoryRepository = new CategoryRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    res.send(await categoryRepository.get());
})

export default router;