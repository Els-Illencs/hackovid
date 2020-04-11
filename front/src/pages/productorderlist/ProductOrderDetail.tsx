import React, { useContext, useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PaymentIcon from '@material-ui/icons/Payment';
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from '../../models/product/Product';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { Order } from '../../models/order/Order';
import { AppContext } from '../../app-components';
import { ProductOrderApiClient } from '../../api/ProductOrderApiClient';
import { ProductOrderItem } from '../../components/ProductOrderItem';

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

const apiClient = new ProductApiClient();
const productOrderApiClient = new ProductOrderApiClient();

export const ProductOrderDetail: React.FunctionComponent = () => {

    const classes = useStyles();
    const { user } = useContext(AppContext);
    const [products, setProducts] = useState([] as Product[]);
    const [order, setOrder] = useState({} as Order);

    useEffect(() => {
        const getOrder = async () => {
            setOrder(await productOrderApiClient.getOrder(0, 0));
        }
        getOrder();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            const products = await apiClient.getProductsByOrderId(order.id);
            setProducts(products)
        }
        getProducts();
    }, [order]);

    return (
        <Grid container>
            <ProductOrderItem order={order} showDetailButton={false} />
            {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={productTmp} />)}
        </Grid>
    );
}