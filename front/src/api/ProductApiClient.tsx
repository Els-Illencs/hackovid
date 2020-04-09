import Axios from "axios";
import { Product } from "../models/product/Product";


export class ProductApiClient {
    async getProducts() {
        const res = await Axios.get(process.env.REACT_APP_API_URL + 'products');

        return res.data as Product[];
    }

    async getProductsBycategory(categoryId: number) {
        const res = await Axios.get(process.env.REACT_APP_API_URL + 'products?categoryId=' + categoryId);

        return res.data as Product[];
    }
    
    async getProductsByName(name: string) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?name=${name}`);

        return res.data as Product[];
    }
}