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
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}/products`);

        return res.data as OrderProducts[];
    }

    async applyOrder(userId: number, order: CreateOrder) {
        const body = {
            type: order.type,
            isPaid: order.isPaid,
            rating: order.rating,
            address_lat: order.address_lat,
            address_lng: order.address_lng,
            products: order.products.map(({ id, quantity, price }) => {
                return {
                    id,
                    quantity,
                    price
                }
            }),
        }
        console.log(body);

        const res = await Axios.post(`${process.env.REACT_APP_API_URL}orders/users/${userId}`, body);

        return res.data as OrderProducts[];
    }
}