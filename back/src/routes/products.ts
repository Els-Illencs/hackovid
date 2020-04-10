import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    let categoryId: number = req.query.categoryId ? req.query.categoryId : null;
    let productName: string = req.query.name ? req.query.name : null;
    let order: string = req.query.order ? req.query.order : null;

    let minPrice: number = req.query.minPrice ? req.query.minPrice : null;
    let maxPrice: number = req.query.maxPrice ? req.query.maxPrice : null;
    let rating: number = req.query.rating ? req.query.rating : null;
    let distance: number = req.query.distance ? req.query.distance : null;

    if(categoryId) {
        res.send(await productRepository.getByCategory(categoryId, order, minPrice, maxPrice, rating, distance));
    } else if(productName) {
        res.send(await productRepository.getByName(productName, order, minPrice, maxPrice, rating, distance));
    } else  {
        res.send(await productRepository.get(order, minPrice, maxPrice, rating, distance));
    }
})

export default router;