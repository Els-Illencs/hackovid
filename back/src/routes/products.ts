import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    res.send(await productRepository.get());
})

export default router;