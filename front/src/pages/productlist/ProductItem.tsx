import React, { useContext, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Product, ProductShoppingCart } from '../../models/product/Product';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { AppContext } from '../../app-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      display: 'flex',
      alignItems: 'center',
    },
    quantity: {
      width: "100%",
      marginRight: 16
    },
    card: {
      paddingBottom: "16px !important"
    },
    addButton: {
      width: "100%"
    }
  }),
);

export interface ProductItemProps {
  product: Product;
};

export const ProductItem: React.FunctionComponent<ProductItemProps> = ({ product }) => {
  const { shoppingCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState("");

  const classes = useStyles();

  const addProductToShoppingCart = async () => {
    const shoppingCartProduct: ProductShoppingCart = {
      ...product,
      quantity: +quantity,
    }
    shoppingCart.addProduct(shoppingCartProduct);
  }//{product.product_type_id === 1 ? "€/unitat" : "€/Kg"}

  return (
    <ProductInfoItem product={product} >
      <CardContent className={classes.card}>
        <div className={classes.mainContent}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {product.product_type_id == 1 &&
              <TextField 
                fullWidth
                style={{ maxWidth: 108 }}
                className={classes.quantity} 
                type="number" 
                size="small" 
                label="Quantitat"
                InputProps={{  inputProps: { min: 0, step: 1 } }}
                value={quantity} 
                onChange={(event) => setQuantity(event.target.value)}
              />
              }
              {product.product_type_id != 1 &&
              <TextField 
                fullWidth
                style={{ maxWidth: 108 }}
                className={classes.quantity} 
                type="number" 
                size="small" 
                label="Quantitat"
                InputProps={{  inputProps: { min: 0, step: 0.1 } }}
                value={quantity} 
                onChange={(event) => setQuantity(event.target.value)}
              />
              }
              <Button 
                fullWidth
                style={{ maxWidth: 82 }}
                className={classes.addButton} 
                onClick={addProductToShoppingCart} 
                size="medium" 
                disabled={quantity === "" || +quantity === 0}>
                Afegir
                </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </ProductInfoItem>
  );
}