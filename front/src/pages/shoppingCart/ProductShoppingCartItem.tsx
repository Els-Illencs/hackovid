import React, { useContext, useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ProductShoppingCart } from '../../models/product/Product';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { AppContext } from '../../app-components';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      paddingBottom: 0
    },
    image: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column'
    },
    cover: {
      alignItems: 'center',
      width: 80,
      height: 80,
      display: 'flex',
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
    },
    quantity: {
      width: "100%"
    },
    card: {
      paddingBottom: "16px !important"
    },
  }),
);

export interface ProductShoppingCartItemProps {
  product: ProductShoppingCart;
};

export const ProductShoppingCartItem: React.FunctionComponent<ProductShoppingCartItemProps> = ({ product }) => {
  const { shoppingCart } = useContext(AppContext);
  const classes = useStyles();
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setQuantity(String(product.quantity));
  }, [product]);

  const deleteProduct = () => shoppingCart.deleteProduct(product.id);

  const updateProduct = (newQuantity: string) => {
    setQuantity(newQuantity);
    shoppingCart.updateProduct({ ...product, quantity: +newQuantity, });
  }

  return (
    <ProductInfoItem product={product} >
      <CardContent className={classes.card}>
        <div className={classes.mainContent}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <TextField 
                fullWidth
                style={{ maxWidth: 160 }}
                className={classes.quantity} 
                type="number" 
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                label="Quantitat" 
                value={quantity} 
                onChange={(event) => updateProduct(event.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                style={{ maxWidth: 115 }}  
                onClick={deleteProduct} 
                size="medium" 
                color="secondary">
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </ProductInfoItem>
  );
}