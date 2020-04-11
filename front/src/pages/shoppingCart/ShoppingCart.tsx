import React, { useContext } from "react";
import { Card, makeStyles, Theme, createStyles, CardActionArea, Button, CardContent, Typography } from "@material-ui/core";
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
      width: "100%",
      marginTop: 32
    },
    subtotal: {
      paddingLeft: 0,
      paddingTop: 8,
    },
    summary: {
      paddingTop: 16,
    },
    summaryCard: {
      padding: "0 !important",
    }
  }),
);

export const ShoppingCart: React.FunctionComponent = () => {
  const { user, shoppingCart: { products } } = useContext(AppContext);

  const classes = useStyles();

  const totalPrice = products.reduce((priceSum, { price, quantity }) => priceSum + price * quantity, 0);

  return (
    <div>
      <Card className={classes.header}>
        {products.length === 0 ?
          <CardContent className={classes.summaryCard}>
            <Typography className={classes.summary} variant="h6" align="left">Cistella buida</Typography>
            <Link to="/home">
              <Button className={classes.button}>
                Comença a comprar
              </Button>
            </Link>
          </CardContent> :
          <>
            <Typography className={classes.summary} variant="h6" align="left">Resum de la cistella</Typography>

            <CardContent className={classes.subtotal}>
              Subtotal ({products.length}) productes: {totalPrice.toFixed(2)} €
            </CardContent>
            <CardActionArea>
              <Link to="/checkout">
                <Button className={classes.button} size="large" color="secondary" disabled={totalPrice === 0}>
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