import Axios from "axios";
import { Order } from "../models/order/Order";


export class ProductOrderApiClient {
    async getAllOrders(userId: number) {
        let productOrderList: Order[] = [{
            id: 0,
            userid: 1,
            createdAt: "11/04/2020",
            updatedAt: "11/04/2020",
            tracking: 5,
            orderType: 1,
            paied: true
          },
          {
            id: 1,
            userid: 1,
            createdAt: "11/04/2020",
            updatedAt: "11/04/2020",
            tracking: 2,
            orderType: 0,
            paied: false
          }];
          return productOrderList;
        /*const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders?userId=${userId}`);

        return res.data as Order[];*/
    }

    async getOrder(orderId: number, userId: number) {
        let order: Order = {
            id: orderId,
            userid: 1,
            createdAt: "11/04/2020",
            updatedAt: "11/04/2020",
            tracking: 5,
            orderType: 1,
            paied: true
        };
        return order;
        /*const res = await Axios.get(`${process.env.REACT_APP_API_URL}orders/${orderId}?userId=${userId}`);

        return res.data as Order;*/
    }
}