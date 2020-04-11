import React, { useContext, useState } from 'react';
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

const PICK_UP_ORDER: number = 0;
const DELIVER_ORDER: number = 1;

export interface ProductOrderItemProps {
    order: Order;
    products?: Product[];
};

export const ProductOrderItem: React.FunctionComponent<ProductOrderItemProps> = ({ order, products }) => {

    const classes = useStyles();

    const getMaxStep = (): number => {
        if(order.orderType == PICK_UP_ORDER) {
            return 4;
        } else if(order.orderType == DELIVER_ORDER) {
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
                        {order.createdAt}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container justify="flex-end">
                        {order.tracking < maxStep &&
                        <Typography className={classes.title} color="secondary" gutterBottom>
                        En curs
                        </Typography>
                        }
                        {order.tracking >= maxStep &&
                        <Button variant="contained" color="secondary">
                            Repetir
                        </Button>
                        }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <OrderTracking orderType={order.orderType} trackingStep={order.tracking} />
                </Grid>
                {order.orderType == PICK_UP_ORDER &&
                    <Grid container justify="center" className={classes.alignToCenter}>
                        <Grid item xs={6}>
                            <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                <ShoppingBasketIcon fontSize="small" /> A recollir
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {order.paied == true &&
                                <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                    <PaymentIcon fontSize="small" /> Pagat
                                </Typography>
                            }
                            {order.paied == false &&
                                <Typography variant="caption" className={classes.wrapIcon} gutterBottom>
                                    <PaymentIcon fontSize="small" /> No pagat (pagar al comerç)
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                }
                {order.orderType == DELIVER_ORDER &&
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
                <Button size="small" className={classes.detailButton}>Detallar</Button>
            </CardActions>
        </Card>
      );
}