import React, { useContext } from "react";
import { KeyboardArrowRight } from '@material-ui/icons';
import { Card, makeStyles, Theme, createStyles, Button, Grid, Typography, IconButton } from "@material-ui/core";
import { AppContext } from '../../app-components';
import { ProductInfoItem } from "../../components/ProductInfoItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 0,
      paddingBottom: 0,
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
    },
    bold: {
      fontWeight: "bold",
    },
    arrowButton: {
      verticalAlign: "baseline",
      padding: 0,
      paddingLeft: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    marginBottom: {
      marginBottom: 16
    }
  }),
);

export const Checkout: React.FunctionComponent = () => {
  const { user, shoppingCart: { products } } = useContext(AppContext);

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
        <div className={classes.marginBottom}>
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
        <div className={classes.marginBottom}>15 abr 2020</div>
      </Card>

      <Card className={classes.header}>
        <Grid container spacing={1} >
          <Grid item xs={11}>
            <h4>Direcció d'enviament</h4>
            <Typography component="p">
              {user.name}
            </Typography>
            <Typography component="p" className={classes.marginBottom}>
              {user.address}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.arrowButton}>
            <IconButton onClick={() => { }} edge="start" color="inherit" aria-label="menu">
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Card>

      <Card className={classes.header}>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <h4>Informació de pagament</h4>
            <Typography component="p" className={classes.marginBottom}>
              Mastercard que acaba en XXXX
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.arrowButton}>
            <IconButton onClick={() => { }} edge="start" color="inherit" aria-label="menu">
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Card>

      {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={productTmp} />)}

      <Button className={classes.button} variant="contained" size="large" color="primary" disabled={isBuyButtonDisabled}>
        Comprar ara
      </Button>
    </div>
  );
}