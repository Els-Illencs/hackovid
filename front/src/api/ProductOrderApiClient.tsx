import Axios from "axios";
import { Order, OrderProducts, CreateOrder } from "../models/order/Order";


export class ProductOrderApiClient {
    async getAllOrders(userId: number) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/users/${userId}`);

        return res.data as Order[];
    }

    async getOrder(orderId: number) {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}`);

        return res.data as Order;
    }

    async getProductsByOrderId(orderId: number) {
        console.log("here");
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}/products`);

        return res.data as OrderProducts[];
    }

    async applyOrder(userId: number, order: CreateOrder) {
        const body = {
            type: order.type,
            isPaid: order.isPaid,
            rating: order.rating,
            products: order.products.map(({ id, quantity, price }) => {
                return {
                    id,
                    quantity,
                    price
                }
            }),
        }

        const res = await Axios.post(`${process.env.REACT_APP_API_URL}orders/users/${userId}`, body);

        return res.data as OrderProducts[];
    }
}