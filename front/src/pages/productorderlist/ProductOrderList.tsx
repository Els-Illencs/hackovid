import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../app-components';
import { Order} from '../../models/order/Order';
import { ProductOrderItem } from '../../components/ProductOrderItem';
import { ProductOrderApiClient } from '../../api/ProductOrderApiClient';


const apiClient = new ProductOrderApiClient();

export const ProductOrderList: React.FunctionComponent = () => {

    const { user } = useContext(AppContext);
    const [orderList, setOrderList] = useState([] as Order[]);

    useEffect(() => {
        const getOrderList = async () => {
            setOrderList(await apiClient.getAllOrders(0));
        }
        getOrderList();
    }, []);

    return(
        <div>
            {orderList.map((order: Order) => (
                <ProductOrderItem order={order} showDetailButton={true}/>
            ))}
        </div>
    );
}