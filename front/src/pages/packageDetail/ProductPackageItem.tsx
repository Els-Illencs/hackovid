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
      width: 125,
      marginRight: 16
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
            <Grid item xs={12}>
            {product.product_type_id == 1 &&
              <TextField 
                fullWidth
                style={{ maxWidth: 108 }}
                className={classes.quantity} 
                type="number" 
                size="small"
                InputProps={{ inputProps: { min: 0, step: 1 } }}
                label="Quantitat" 
                value={product.quantity} 
                onChange={changeQuantity}
              />
              }
              {product.product_type_id != 1 &&
              <TextField 
                fullWidth
                style={{ maxWidth: 108 }}
                className={classes.quantity} 
                type="number" 
                size="small"
                InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                label="Quantitat" 
                value={product.quantity} 
                onChange={changeQuantity}
              />
              }
              <Button
                fullWidth
                style={{ maxWidth: 82 }} 
                onClick={deleteProduct} 
                size="medium" 
                color="secondary" >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </ProductInfoItem>
  );
}