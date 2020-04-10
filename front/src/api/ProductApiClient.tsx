import Axios from "axios";
import { Product } from "../models/product/Product";


export class ProductApiClient {
    async getProducts(order: string | null) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?order=${order}`);

        return res.data as Product[];
    }

    async getProductsBycategory(categoryId: number, order: string | null) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?categoryId=${categoryId}&order=${order}`);

        return res.data as Product[];
    }
    
    async getProductsByName(name: string, order:string | null) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}products?name=${name}&order=${order}`);

        return res.data as Product[];
    }
}