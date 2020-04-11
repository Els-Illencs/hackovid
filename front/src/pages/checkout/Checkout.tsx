import React, { useContext, useEffect, useState } from "react";
import { Card, makeStyles, Theme, createStyles, Button, Grid, Typography, Select, Switch, Tabs, Tab, Input, InputLabel } from "@material-ui/core";
import { AppContext } from '../../app-components';
import { ProductInfoItem } from "../../components/ProductInfoItem";
import { useHistory } from "react-router-dom";
import { saveLoginRedirect } from "../../services/LoginService";

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
    }, tabs: {
      width: "100%"
    },
    deliverTabs: {
      marginBottom: 24
    },
    selectWidth: {
      minWidth: "120px !important",
      marginBottom: 16
    },
  }),
);

enum PaymentMethod {
  SHOP = "SHOP",
  ONLINE = "ONLINE",
}

export const Checkout: React.FunctionComponent = () => {
  const { user: { user, userAddress, isLoading }, shoppingCart: { products } } = useContext(AppContext);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>();
  const [selectedDeliverTab, setSelectedDeliverTab] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    if (!isLoading && !user) {
      saveLoginRedirect('/checkout');
      history.push("/login");
    }
  }, [isLoading]);

  const totalPriceProducts: number = products.reduce((priceSum, { price, quantity }) => priceSum + price * quantity, 0);
  const shippingPrice = 10;
  const totalPrice: number = totalPriceProducts + shippingPrice;

  const isBuyButtonDisabled = selectedDeliverTab === 0 && paymentMethod === undefined;

  const address = userAddress ? userAddress.address : user?.address;

  const switchDeliver = (value: any) => {
    if (value !== selectedDeliverTab) {
      setSelectedDeliverTab(+value);
    }
  }

  return (
    <>{user && <div>
      <Grid component="label" container alignItems="center" spacing={0} className={classes.deliverTabs}>
        <Grid xs={12} item><h4>Mètode d'entrega</h4></Grid>
        <Tabs
          className={classes.tabs}
          value={selectedDeliverTab}
          onChange={(_, value) => switchDeliver(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recollida a tenda" />
          <Tab label="Enviament a casa" />
        </Tabs>
      </Grid>

      {
        selectedDeliverTab === 1 ?
          <>
            <Card className={classes.header}>
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  <h4>Informació de pagament</h4>
                  <Typography component="p" className={classes.marginBottom}>
                    Online targeta
                </Typography>
                </Grid>
              </Grid>
            </Card>

            <Card className={classes.header}>
              <Grid container spacing={1} >
                <Grid item xs={11}>
                  <h4>Direcció d'enviament</h4>
                  <Typography component="p">
                    {user.name} {user.surname}
                  </Typography>
                  <Typography component="p">
                    {user.phone}
                  </Typography>
                  <Typography component="p" className={classes.marginBottom}>
                    {address}
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            <Card className={classes.header}>
              <h4>Resum</h4>
              <div className={classes.marginBottom}>
                <div>
                  Productes: {totalPriceProducts.toFixed(2)} €
              </div>
                <div>
                  Enviament: {shippingPrice.toFixed(2)} €
              </div>
                <div className={classes.totalPrice}>
                  Enviament: {totalPrice.toFixed(2)} €
              </div>
              </div>
            </Card>
          </>
          : <>
            <Card className={classes.header}>
              <Grid component="label" container alignItems="center" spacing={0}>
                <Grid xs={12} item><h4>Mètode de pagament</h4></Grid>
                <Select
                  native
                  className={classes.selectWidth}
                  value={paymentMethod}
                  onChange={(event) => {
                    setPaymentMethod(PaymentMethod[String(event.target.value)])
                  }}
                >
                  <option value={''}>-</option>
                  <option value={PaymentMethod.ONLINE}>Online</option>
                  <option value={PaymentMethod.SHOP}>Tenda</option>
                </Select>
              </Grid>
            </Card>

            <Card className={classes.header}>
              <Grid container spacing={1} >
                <Grid item xs={11}>
                  <h4>Dades del client</h4>
                  <Typography component="p">
                    {user.name} {user.surname}
                  </Typography>
                  <Typography component="p" className={classes.marginBottom}>
                    Telèfon: {user.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            <Card className={classes.header}>
              <h4>Resum</h4>
              <div className={classes.marginBottom}>
                <div className={classes.totalPrice}>
                  Total: {totalPriceProducts.toFixed(2)} €
              </div>
              </div>
            </Card>
          </>
      }
      <Button className={classes.button} variant="contained" size="large" color="primary" disabled={isBuyButtonDisabled}>
        Comprar ara
      </Button>

      {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={productTmp} />)}

      {
        products.length > 2 && <Button className={classes.button} variant="contained" size="large" color="primary" disabled={isBuyButtonDisabled}>
          Comprar ara
      </Button>
      }
    </div >}
    </>
  );
}