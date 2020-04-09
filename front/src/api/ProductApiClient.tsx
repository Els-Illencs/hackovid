import Axios from "axios";
import { Product } from "../models/product/Product";


export class ProductApiClient {
    async getProducts() {
        //const res = await Axios.get(process.env.REACT_APP_API_URL + 'products');

        //return res.data as Product[];

        const products: Product[] = [
            {
                id: 1,
                name: "Nom producte",
                image: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg",
                shopId: 1,
                categoryId: 1,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                active: true,
                price: 10
              }
        ];

        return products as Product[];
    }
}