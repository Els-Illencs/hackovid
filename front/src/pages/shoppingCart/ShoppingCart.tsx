import React, { useState, useEffect } from "react";
import { Product } from "../../models/product/Product";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";
import { Card, makeStyles, Theme, createStyles, CardActionArea, Button, CardContent } from "@material-ui/core";
import { ProductItem } from "../productlist/ProductItem";

const apiClient = new ShoppingCartApiClient();


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: 30,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 0,
      paddingBottom: 16
    },
    button: {
      width: "100%"
    },
    productCard: {
      paddingTop: 16,
    }
  }),
);

export const ShoppingCart: React.FunctionComponent = () => {
  const [products, setProducts] = useState([] as Product[]);

  const classes = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await apiClient.getItems());
    }
    getProducts();
  }, []);

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

      {products.map((productTmp) => <div className={classes.productCard}><ProductItem product={productTmp} /> </div>)}
    </div>
  );
}