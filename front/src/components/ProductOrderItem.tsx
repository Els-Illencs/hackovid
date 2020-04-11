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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%'
    },
    title: {
        fontSize: 14
    },
    detailButton: {
        margin: 'auto',
        width: '50%'
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
                <OrderTracking orderType={order.orderType} trackingStep={order.tracking} />
            </CardContent>
            <CardActions>
                <Button size="small" className={classes.detailButton}>Detallar comanda</Button>
            </CardActions>
        </Card>
      );
}