import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Theme, createStyles, Button, Grid, Typography, Select, Switch, Tabs, Tab, Input, InputLabel, ExpansionPanel, TextField, Container, MenuItem, FormControl } from "@material-ui/core";
import { AppContext } from '../../app-components';
import { Link } from 'react-router-dom';
import { ProductInfoItem } from "../../components/ProductInfoItem";
import { useHistory } from "react-router-dom";
import { saveLoginRedirect } from "../../services/LoginService";
import { ProductOrderApiClient } from "../../api/ProductOrderApiClient";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

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
    form: {
      '& .MuiFormControl-root': {
        marginBottom: theme.spacing(1)
      },
    },
    marginBottom: {
      marginBottom: 16
    },
    tabs: {
      width: "100%"
    },
    deliverTabs: {
      marginBottom: 24
    },
    column: {
      flexBasis: '33.33%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    clientInfo: {
      marginBottom: 16
    },
    summary: {
      paddingTop: 16,
      paddingBottom: 16,
    },
    summaryCard: {
      padding: "0 !important",
    },
    quantity: {
      paddingBottom: 16,
      paddingTop: 8,
      marginLeft: 16
    },
  }),
);

enum PaymentMethod {
  SHOP = "SHOP",
  ONLINE = "ONLINE",
}

const productOrderApiClient = new ProductOrderApiClient();

export const Checkout: React.FunctionComponent = () => {
  const { user: { user, userAddress, isLoading }, shoppingCart: { products, reset } } = useContext(AppContext);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>();
  const [selectedDeliverTab, setSelectedDeliverTab] = useState(0);
  const [address, setAddress] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [isOrderDone, setIsOrderDone] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (!isLoading && !user) {
      saveLoginRedirect('/checkout');
      history.push("/login");
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      setAddress(userAddress && userAddress.address !== "" ? userAddress.address! : user.address.address!);
      setNameAndSurname(`${user.name} ${user.surname}`);
      setPhone(user.phone);
    }
  }, [user, userAddress]);

  const totalPriceProducts: number = products.reduce((priceSum, { price, quantity }) => priceSum + price * quantity, 0);
  const shippingPrice = 10;
  const totalPrice: number = totalPriceProducts + shippingPrice;

  const isBuyButtonDisabled = (selectedDeliverTab === 0 && paymentMethod === undefined) || address === "" || nameAndSurname === "" || phone === "";


  const switchDeliver = (value: any) => {
    if (value !== selectedDeliverTab) {
      setSelectedDeliverTab(+value);
    }
  }

  const buy = async () => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async ({ lat, lng }) => {
        console.log(lat, lng);
        await productOrderApiClient.applyOrder(user!.id, {
          type: selectedDeliverTab,
          rating: 3,
          address_lat: lat,
          address_lng: lng,
          isPaid: paymentMethod === PaymentMethod.ONLINE,
          products: products.map(({ id, quantity, price }) => {
            return {
              id,
              quantity,
              price
            }
          }),
        });
        reset();
        setIsOrderDone(true);
      })

  }

  return (
    <>
      {user && isOrderDone &&
        <Card className={classes.header}>
          <CardContent className={classes.summaryCard}>
            <Typography className={classes.summary} variant="h6" align="left">Comanda realitzada amb èxit.</Typography>
            <Button component={Link} to="/order-list" className={classes.button}>
              Vegi les seves comandes
           </Button>
          </CardContent>
        </Card>
      }
      {(user && !isOrderDone) && <div>
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

        <Container maxWidth="xs" className={classes.form}>
          {
            selectedDeliverTab === 1 ?
              <>
                <Card className={classes.header}>
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <h4>Mètode de pagament</h4>
                      <Typography component="p" className={classes.marginBottom}>
                        En línia
                  </Typography>
                    </Grid>
                  </Grid>
                </Card>

                <Card className={classes.header}>
                  <Grid container spacing={1} >
                    <Grid item xs={12}>
                      <h4>Direcció d'enviament</h4>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="nameSurname"
                          name="nameSurname"
                          label="Nom i cognoms*"
                          type="text"
                          onChange={(event) => setNameAndSurname(event.target.value)}
                          value={nameAndSurname}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          label="Telèfon*"
                          type="text"
                          onChange={(event) => setPhone(event.target.value)}
                          value={phone}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="address"
                          name="address"
                          label="Direcció*"
                          type="text"
                          multiline
                          rows="2"
                          onChange={(event) => setAddress(event.target.value)}
                          value={address}
                        />
                      </Grid>
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
                      Total: {totalPrice.toFixed(2)} €
                </div>
                  </div>
                </Card>
              </>
              : <>
                <Card className={classes.header}>
                  <Grid component="label" container alignItems="center" spacing={0}>
                    <Grid xs={12} item><h4>Mètode de pagament</h4></Grid>
                    <FormControl fullWidth>
                      <Select
                        variant="standard"
                        value={paymentMethod}
                        onChange={(event) => {
                          setPaymentMethod(PaymentMethod[String(event.target.value)])
                        }}
                      >
                        <MenuItem value={''}>-</MenuItem>
                        <MenuItem value={PaymentMethod.ONLINE}>En línia</MenuItem>
                        <MenuItem value={PaymentMethod.SHOP}>Tenda</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Card>

                <Card className={classes.header}>
                  <Grid container spacing={1} >
                    <Grid item xs={12}>
                      <h4>Dades del client</h4>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="nameSurname"
                          name="nameSurname"
                          label="Nom i cognoms*"
                          type="text"
                          onChange={(event) => setNameAndSurname(event.target.value)}
                          value={nameAndSurname}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          label="Telèfon*"
                          type="text"
                          onChange={(event) => setPhone(event.target.value)}
                          value={phone}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.clientInfo}>
                        <TextField
                          fullWidth
                          id="address"
                          name="address"
                          label="Direcció*"
                          type="text"
                          multiline
                          rows="2"
                          onChange={(event) => setAddress(event.target.value)}
                          value={address}
                        />
                      </Grid>
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
        </Container>
        <Button className={classes.button} onClick={buy} size="large" color="primary" disabled={isBuyButtonDisabled}>
          Comprar ara
      </Button>

        {products.map((productTmp) => <ProductInfoItem key={String(productTmp.id)} product={productTmp} >
          <Typography component="p" className={classes.quantity} >
            Quantitat: {productTmp.quantity}
          </Typography>
        </ProductInfoItem>
        )}

        {
          products.length > 2 && <Button onClick={buy} className={classes.button} size="large" color="primary" disabled={isBuyButtonDisabled}>
            Comprar ara
      </Button>
        }
      </div >}
    </>
  );
}