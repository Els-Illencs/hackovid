import Axios from "axios";
import { Order } from "../models/order/Order";


export class ProductOrderApiClient {
    async getAllOrders(userId: number) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/users/${userId}`);

        return res.data as Order[];
    }

    async getOrder(orderId: number) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}`);

        return res.data as Order;
    }
}