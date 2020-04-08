import Axios from "axios";
import { Category } from '../models/category/Category';


export class CategoryApiClient {
    async getCategories() {
        const res = await Axios.get(process.env.REACT_APP_API_URL + 'categories');

        return res.data as Category[];
    }
}