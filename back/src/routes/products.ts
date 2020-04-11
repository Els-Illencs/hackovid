import express from 'express';
import { ProductRepository } from '../lib/category/ProductRepository';

const productRepository = new ProductRepository();

const router = express.Router();

const MAX_DISTANCE_FILTER_FIELD: number = 20;

router.get('/', async function(req, res, next) {
    let categoryId: number = req.query.categoryId ? req.query.categoryId : null;
    let productName: string = req.query.name ? req.query.name : null;
    let order: string = req.query.order ? req.query.order : null;
    let lat: number = req.query.lat ? req.query.lat : null;
    let lng: number = req.query.lng ? req.query.lng : null;

    let minPrice: number = req.query.minPrice ? req.query.minPrice : null;
    let maxPrice: number = req.query.maxPrice ? req.query.maxPrice : null;
    let rating: number = req.query.rating ? req.query.rating : null;
    let distance: number = req.query.distance ? req.query.distance : MAX_DISTANCE_FILTER_FIELD;
    distance = distance <= MAX_DISTANCE_FILTER_FIELD ? distance : MAX_DISTANCE_FILTER_FIELD; 

    if(categoryId) {
        res.send(await productRepository.getByCategory(categoryId, order, minPrice, maxPrice, rating, distance, lat, lng));
    } else if(productName) {
        res.send(await productRepository.getByName(productName, order, minPrice, maxPrice, rating, distance, lat, lng));
    } else  {
        res.send(await productRepository.get(order, minPrice, maxPrice, rating, distance, lat, lng));
    }
})

export default router;