import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    let categoryId: number = req.query ? req.query.categoryId : null;
    if(categoryId) {
        res.send(await productRepository.getByCategory(categoryId));
    } else {
        res.send(await productRepository.get());
    }
})

export default router;