import express from 'express';
import { PackageRepository, Package } from '../lib/category/PackageRepository';
import { ProductRepository } from '../lib/category/ProductRepository';

const packageRepository = new PackageRepository();
const productRepository = new ProductRepository();

const router = express.Router();

router.get('/', async function(req, res, next) {
    let packageId: number = req.query.packageId ? req.query.packageId : null;
    let lat: number = req.query.lat ? req.query.lat : null;
    let lng: number = req.query.lng ? req.query.lng : null;

    if (packageId) {
        const packageItems: Array<Package> = await packageRepository.getPackagesProducts(packageId);

        let result = await Promise.all(packageItems.map(packageItem => getRelatedProducts(packageItem, lat, lng)));

        var filtered = result.filter(function (el) {
            return el != null;
          });
          

        res.send(filtered);

    } else {
        res.send(await packageRepository.get());
    }
    
})

const getRelatedProducts = (packageItem: Package, lat: number, lng: number) => {
    return new Promise(async (resolve) => {
        if (packageItem.keyword) {
            const res = await productRepository.getByName(packageItem.keyword, null , null, null, null, 10, lat, lng)
            let result = res[0];

            if (result) {
                result = Object.assign(result, {quantity: packageItem.quantity});
            }

            resolve(result)
        } else {
            resolve(null);
        }            
    });
};

export default router;