import React, { useContext } from "react";
import { Card, makeStyles, Theme, createStyles, CardActionArea, Button, CardContent } from "@material-ui/core";
import { ProductShoppingCartItem } from "./ProductShoppingCartItem";
import { AppContext } from '../../app-components';
import { Link } from 'react-router-dom';

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

  const totalPrice = products.reduce((priceSum, { price, quantity }) => priceSum + price * quantity, 0);

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
              <Link to="/checkout">
                <Button className={classes.button} variant="contained" size="large" color="secondary" disabled={totalPrice === 0}>
                  Tramitar comanda
                </Button>
              </Link>
            </CardActionArea>
          </>
        }
      </Card>

      {products.map((productTmp) => <ProductShoppingCartItem key={String(productTmp.id)} product={productTmp} />)}
    </div>
  );
}