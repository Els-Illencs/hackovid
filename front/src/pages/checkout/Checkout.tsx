import React, { useContext } from "react";
import { Card, makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { AppContext } from '../../app-components';
import { ProductInfoItem } from "../../components/ProductInfoItem";

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
      marginBottom: 16
    },
    totalPrice: {
      fontWeight: "bold",
      marginTop: 16,
      fontSize: 16
    }
  }),
);

export const Checkout: React.FunctionComponent = () => {
  const { shoppingCart: { products } } = useContext(AppContext);

  const classes = useStyles();

  const totalPriceProducts: number = products.reduce((priceSum, { price, quantity }) => priceSum + price * quantity, 0);
  const shippingPrice = 10;
  const totalPrice: number = totalPriceProducts + shippingPrice;

  const isBuyButtonDisabled = true; // TODO add logic

  return (
    <div>
      <Button className={classes.button} variant="contained" size="large" color="primary" disabled={isBuyButtonDisabled}>
        Comprar ara
      </Button>

      <Card className={classes.header}>
        <h4>Resum</h4>
        <div>
          <div>
            Productes: {totalPriceProducts} €
          </div>
          <div>
            Enviament: {shippingPrice} €
          </div>
          <div className={classes.totalPrice}>
            Enviament: {totalPrice} €
          </div>
        </div>
      </Card>

      <Card className={classes.header}>
        <h4>Data d'entrega</h4>
        15 abr 2020
      </Card>

      <Card className={classes.header}>
        <h4>Direcció d'enviament</h4>
      </Card>

      <Card className={classes.header}>
        <h4>Informació de pagament</h4>
      </Card>

      {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={productTmp} />)}

      <Button className={classes.button} variant="contained" size="large" color="primary" disabled={isBuyButtonDisabled}>
        Comprar ara
      </Button>
    </div>
  );
}