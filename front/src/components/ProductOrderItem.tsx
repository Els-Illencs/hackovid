import React, { useContext, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Order } from '../models/order/Order';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../models/product/Product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%'
    },
    title: {
        fontSize: 14
    }
  }),
);

export interface ProductOrderItemProps {
    order: Order;
    products: Product[];
};

export const ProductOrderItem: React.FunctionComponent<ProductOrderItemProps> = ({ order, products }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Pedido #{order.id}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Detallar comanda</Button>
            </CardActions>
        </Card>
      );
}