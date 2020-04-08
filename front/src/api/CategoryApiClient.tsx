import Axios from "axios";
import { Category } from '../models/category/Category';


export class CategoryApiClient {
    async getCategoryList() {
        //const res = await Axios.get(process.env.REACT_APP_API_URL!);

        //return res.data as string;

        const image: string = "https://material-ui.com/static/images/grid-list/breakfast.jpg";
        const categoryList: Category[] = [
            { "id": 0, "name": "Fruit", "image": image },
            { "id": 1, "name": "Meat", "image": image },
            { "id": 2, "name": "Started", "image": image }
        ];

        return categoryList as Category[] ;
    }
}