import React, { useContext, useState, useEffect, FC, ChangeEvent } from 'react';
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
  }),
);

export interface ProductPackageItemProps {
  product: ProductShoppingCart,
  onDeleteProduct: (originalProduct: ProductShoppingCart) => void,
  onChangeQuantity: (quantity: number, originalProduct: ProductShoppingCart) => void
};

export const ProductPackageItem: FC<ProductPackageItemProps> = ({ product, onDeleteProduct, onChangeQuantity }) => {
  const classes = useStyles();

  const deleteProduct = () => onDeleteProduct(product);

  const changeQuantity = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newQuantity = parseInt(event.target.value, 10);

    onChangeQuantity(newQuantity, product);
  }

  return (
    <ProductInfoItem product={product} >
      <CardContent>
        <div className={classes.mainContent}>
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <TextField 
                className={classes.quantity} 
                type="number" 
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                label="Quantitat" 
                value={product.quantity} 
                onChange={changeQuantity}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Button onClick={deleteProduct} size="medium" color="secondary" >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </ProductInfoItem>
  );
}