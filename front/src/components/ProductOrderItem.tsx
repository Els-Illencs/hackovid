import React, { useContext, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Order } from '../models/order/Order';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../models/product/Product';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { OrderTracking } from './OrderTracking';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PaymentIcon from '@material-ui/icons/Payment';
import { ProductInfoItem } from './ProductInfoItem';
import { ProductApiClient } from '../api/ProductApiClient';
import { UserAddress } from '../models/user/UserAddress';
import { Link } from 'react-router-dom';

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
            width: '50%',
            textDecoration: 'none',
            textAlign: 'center'
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

const PICK_UP_ORDER: number = 0;
const DELIVER_ORDER: number = 1;

export interface ProductOrderItemProps {
    order: Order;
    showDetailButton?: boolean
};

export const ProductOrderItem: React.FunctionComponent<ProductOrderItemProps> = ({ order, showDetailButton }) => {

    const classes = useStyles();

    const getMaxStep = (): number => {
        if (order.ordertype == PICK_UP_ORDER) {
            return 4;
        } else if (order.ordertype == DELIVER_ORDER) {
            return 5;
        } else {
            return -1;
        }
    };

    const maxStep: number = getMaxStep();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Typography variant="h5" component="h2">
                            Comanda #{order.id}
                        </Typography>
                        <Typography className={classes.title} gutterBottom>
                            {order.createdat}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justify="flex-end">
                            {order.trackingstage < maxStep &&
                                <Typography className={classes.title} color="secondary" gutterBottom>
                                    En curs
                        </Typography>
                            }
                            {order.trackingstage >= maxStep &&
                                <Button variant="contained" color="secondary">
                                    Repetir
                        </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <OrderTracking orderType={order.ordertype} trackingStep={order.trackingstage} />
                </Grid>
                {order.ordertype == PICK_UP_ORDER &&
                    <Grid container justify="center" className={classes.alignToCenter}>
                        <Grid item xs={6}>
                            <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                <ShoppingBasketIcon fontSize="small" /> A recollir
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {order.ispaid == true &&
                                <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                    <PaymentIcon fontSize="small" /> Pagat
                                </Typography>
                            }
                            {order.ispaid == false &&
                                <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                    <PaymentIcon fontSize="small" /> No pagat (pagar al comerç)
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                }
                {order.ordertype == DELIVER_ORDER &&
                    <Grid container justify="center" className={classes.alignToCenter}>
                        <Grid item xs={6}>
                            <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                <LocalShippingIcon fontSize="small" /> A domicili
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                <PaymentIcon fontSize="small" /> Pagat
                        </Typography>
                        </Grid>
                    </Grid>
                }
            </CardContent>
            <CardActions>
                {showDetailButton == undefined || showDetailButton == true &&
                    <Link to={`/order/${order.id}`} className={classes.detailButton}>
                        <Button size="small">Detallar</Button>
                    </Link>
                }
            </CardActions>
        </Card>
    );
}