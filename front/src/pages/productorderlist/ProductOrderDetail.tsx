import React, { useContext, useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProductApiClient } from '../../api/ProductApiClient';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { Order, OrderProducts } from '../../models/order/Order';
import { AppContext } from '../../app-components';
import { ProductOrderApiClient } from '../../api/ProductOrderApiClient';
import { ProductOrderItem } from '../../components/ProductOrderItem';
import { useHistory } from "react-router-dom";
import { Product } from '../../models/product/Product';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(4)
        },
        title: {
            fontSize: 14
        },
        detailButton: {
            margin: 'auto',
            width: '50%'
        },
        wrapIcon: {
            verticalAlign: 'middle',
            display: 'inline-flex',
            textAlign: 'center'
        },
        alignToCenter: {
            textAlign: 'center'
        }
    }),
);

const productOrderApiClient = new ProductOrderApiClient();

export const ProductOrderDetail: React.FunctionComponent = () => {
    const classes = useStyles();
    const { user: { isLoading: isLoadingUserData, user } } = useContext(AppContext);
    const [products, setProducts] = useState([] as OrderProducts[]);
    const [order, setOrder] = useState({} as Order);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const getOrder = async () => {
            setIsLoading(true);
            const orderId = history.location.pathname.split("order/")[1];
            setOrder(await productOrderApiClient.getOrder(Number(orderId)));
            setIsLoading(false);
        }
        if (user) {
            getOrder();
        }
    }, [user]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await productOrderApiClient.getProductsByOrderId(order.id);
            setProducts(products)
        }
        getProducts();
    }, [order]);

    return (
        <>
            {!isLoading && <Grid container>
                <ProductOrderItem order={order} showDetailButton={false} />
                {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={orderProduct2Product(productTmp)} />)}
            </Grid>}
        </>
    );
}

const orderProduct2Product = (product: OrderProducts): Product => {
    return {
        id: -1,
        name: product.name,
        image: product.image,
        shopid: product.shopid,
        shopname: product.shopname,
        avg_rating: product.avg_rating,
        count_rating: product.count_rating,
        categoryid: product.categoryid,
        description: product.description,
        active: product.active,
        price: product.price,
        product_type_id: product.product_type_id,
    }
}