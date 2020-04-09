import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    let categoryId: number = req.query.categoryId ? req.query.categoryId : null;
    let productName: string = req.query.name ? req.query.name : null;

    if(categoryId) {
        res.send(await productRepository.getByCategory(categoryId));
    } else if(productName) {
        res.send(await productRepository.getByName(productName));
    } else  {
        res.send(await productRepository.get());
    }
})

export default router;