import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    let categoryId: number = req.query.categoryId ? req.query.categoryId : null;
    let productName: string = req.query.name ? req.query.name : null;
    let order: string = req.query.order ? req.query.order : null;

    if(categoryId) {
        res.send(await productRepository.getByCategory(categoryId, order));
    } else if(productName) {
        res.send(await productRepository.getByName(productName, order));
    } else  {
        res.send(await productRepository.get(order));
    }
})

export default router;