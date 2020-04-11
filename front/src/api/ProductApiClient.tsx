import Axios from "axios";
import { Product } from "../models/product/Product";
import { ProductFilterFields } from "../models/product/ProductFilterFields";


export class ProductApiClient {
    async getProducts(order: string | null, productFilterFields: ProductFilterFields | null, userAddress) {
        const filter: string = this.buildFilterParams(productFilterFields);
        userAddress.latitude = userAddress.latitude ? userAddress.latitude : 0;
        userAddress.longitude = userAddress.longitude ? userAddress.longitude : 0;
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?order=${order}${filter}&lat=${userAddress.latitude}&lng=${userAddress.longitude}`);

        return res.data as Product[];
    }

    async getProductsBycategory(categoryId: number, order: string | null, productFilterFields: ProductFilterFields | null, userAddress) {
        const filter: string = this.buildFilterParams(productFilterFields);
        userAddress.latitude = userAddress.latitude ? userAddress.latitude : 0;
        userAddress.longitude = userAddress.longitude ? userAddress.longitude : 0;
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?categoryId=${categoryId}&order=${order}${filter}&lat=${userAddress.latitude}&lng=${userAddress.longitude}`);

        return res.data as Product[];
    }
    
    async getProductsByName(name: string, order:string | null, productFilterFields: ProductFilterFields | null, userAddress) {
        const filter: string = this.buildFilterParams(productFilterFields);
        userAddress.latitude = userAddress.latitude ? userAddress.latitude : 0;
        userAddress.longitude = userAddress.longitude ? userAddress.longitude : 0;
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?name=${name}&order=${order}${filter}&lat=${userAddress.latitude}&lng=${userAddress.longitude}`);

        return res.data as Product[];
    }

    private buildFilterParams(productFilterFields: ProductFilterFields | null): string {
        let path: string = '';
        if(productFilterFields) {
            const separator: string = '&';
            
            if(productFilterFields.minPrice && productFilterFields.minPrice > 0) {
                path += 'minPrice=' + productFilterFields.minPrice;
            }
            if(productFilterFields.maxPrice && productFilterFields.maxPrice > 0) {
                path = path != '' ? path + separator : path;
                path += 'maxPrice=' + productFilterFields.maxPrice;
                
            }
            if(productFilterFields.rating && productFilterFields.rating > 0) {
                path = path != '' ? path + separator : path;
                path += 'rating=' + productFilterFields.rating;
            }
            if(productFilterFields.distance && productFilterFields.distance > 0) {
                path = path != '' ? path + separator : path;
                path += 'distance=' + productFilterFields.distance;
            }
            path = path && path != '' ? separator + path : path;
        }
        return path;
    }
}