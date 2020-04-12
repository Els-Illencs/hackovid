import React, { useContext, useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { Order, OrderProducts } from '../../models/order/Order';
import { AppContext } from '../../app-components';
import { ProductOrderApiClient } from '../../api/ProductOrderApiClient';
import { ProductOrderItem } from '../../components/ProductOrderItem';
import { useHistory } from "react-router-dom";
import { MapRouteView } from '../../components/MapRouteView';
import { Product } from '../../models/product/Product';
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        quantity: {
            paddingBottom: 16,
            paddingTop: 8,
            marginLeft: 16
        },
        expansionPanel: {
            marginBottom: "1em",
            width: "100%"
        }
    }),
);

const productOrderApiClient = new ProductOrderApiClient();

export const ProductOrderDetail: React.FunctionComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user: { isLoading: isLoadingUserData, user }, shoppingCart: { addProducts } } = useContext(AppContext);
    const [products, setProducts] = useState([] as OrderProducts[]);
    const [order, setOrder] = useState<Order | undefined>();
    const [isLoading, setIsLoading] = useState(true);

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
            if (order) {
                const products = await productOrderApiClient.getProductsByOrderId(order.id);
                setProducts(products)
            }
        }
        getProducts();
    }, [order]);

    const clickRepeat = async () => {
        await addProducts(products);
        history.push("/shopping-cart");
    }

    return (
        <>
            {!isLoading && order && <Grid container className={classes.root}>
                <ProductOrderItem order={order} showDetailButton={false} onClickRepeate={clickRepeat} />

                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div >
                            <Typography>Mostrar ruta més òptima per cercar la comanda</Typography>
                        </div>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MapRouteView />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={orderProduct2Product(productTmp)} >
                    <Typography component="p" className={classes.quantity} >
                        Quantitat: {productTmp.quantity}
                    </Typography>
                </ProductInfoItem>)}
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