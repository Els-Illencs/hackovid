import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../app-components';
import { Order} from '../../models/order/Order';
import { ProductOrderItem } from '../../components/ProductOrderItem';

export const ProductOrderList: React.FunctionComponent = () => {

    const { user } = useContext(AppContext);
    const [orderList, setOrderList] = useState([] as Order[]);

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

    useEffect(() => {
        productOrderList = productOrderList.sort((order1, order2) => order1.tracking - order2.tracking);
        setOrderList(productOrderList);
    }, []);

    return(
        <div>
            {orderList.map((order: Order) => (
                <ProductOrderItem order={order} />
            ))}
        </div>
    );
}