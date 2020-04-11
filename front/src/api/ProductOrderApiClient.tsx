import Axios from "axios";
import { Order } from "../models/order/Order";


export class ProductOrderApiClient {
    async getAllOrders(userId: number) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders?userId=${userId}`);

        return res.data as Order[];
    }

    async getOrder(orderId: number, userId: number) {
        let order: Order = {
            id: orderId,
            userid: 1,
            createdat: "11/04/2020",
            updatedat: "11/04/2020",
            trackingstage: 5,
            ordertype: 1,
            ispaid: true
        };
        return order;
        /*const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}?userId=${userId}`);

        return res.data as Order;*/
    }
}