import React, { useState, useEffect, useContext } from "react";
import { Product } from "../../models/product/Product";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";
import { Card, makeStyles, Theme, createStyles, CardActionArea, Button, CardContent } from "@material-ui/core";
import { ProductShoppingCartItem } from "./ProductShoppingCartItem";
import { AppContext } from '../../app-components';

const apiClient = new ShoppingCartApiClient();


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 0,
      paddingBottom: 16,
      marginBottom: 16
    },
    button: {
      width: "100%"
    },
  }),
);

export const ShoppingCart: React.FunctionComponent = () => {
  const { shoppingCart: { products } } = useContext(AppContext);

  const classes = useStyles();

  const totalPrice = products.reduce((priceSum, { price }) => priceSum + price, 0);

  return (
    <div>
      <Card className={classes.header}>
        {products.length === 0 ?
          <CardContent>
            Cistella buida
         </CardContent> :
          <>
            <h4>Resum de la cistella</h4>
            <CardContent>
              Subtotal ({products.length}) productes: {totalPrice} €
            </CardContent>
            <CardActionArea>
              <Button className={classes.button} variant="contained" size="large" color="secondary">
                Tramitar comanda
              </Button>
            </CardActionArea>
          </>
        }
      </Card>

      {products.map((productTmp) => <ProductShoppingCartItem product={productTmp} />)}
    </div>
  );
}