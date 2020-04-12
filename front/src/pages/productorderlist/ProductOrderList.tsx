import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../app-components';
import { Order } from '../../models/order/Order';
import { ProductOrderItem } from '../../components/ProductOrderItem';
import { ProductOrderApiClient } from '../../api/ProductOrderApiClient';
import { Grid, CircularProgress, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noResultsFound: {
      paddingTop: 32
    },
  }),
);

const apiClient = new ProductOrderApiClient();

export const ProductOrderList: React.FunctionComponent = () => {
    const classes = useStyles();

    const { user: { isLoading: isLoadingUserData, user } } = useContext(AppContext);
    const [orderList, setOrderList] = useState([] as Order[]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getOrderList = async () => {
            setIsLoading(true);
            setOrderList(await apiClient.getAllOrders(user!.id));
            setIsLoading(false);
        }
        if (user) {
            getOrderList();
        }
    }, [user]);

    return (
        <div>
            <Typography variant="h5">Les meves comandes</Typography>
            {isLoading || isLoadingUserData ? <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <CircularProgress color="primary" />
            </Grid> : orderList.length ? orderList.map((order: Order) => (
                <ProductOrderItem order={order} showDetailButton={true} hideRepeatButton={true} />
            )) : <div className={classes.noResultsFound}>No hi ha cap comanda realitzada</div>}


        </div>
    );
}