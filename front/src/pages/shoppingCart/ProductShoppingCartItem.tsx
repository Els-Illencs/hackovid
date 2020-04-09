import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarsIcon from '@material-ui/icons/Stars';
import { Product } from '../../models/product/Product';
import { ProductInfoItem } from '../../components/ProductInfoItem';
import { ShoppingCartApiClient } from '../../api/ShoppingCartApiClient';

const useStyles = makeStyles((theme: Theme) =>
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

const shoppingCartApiClient = new ShoppingCartApiClient();

export interface ProductShoppingCartItemProps {
  product: Product;
};

export const ProductShoppingCartItem: React.FunctionComponent<ProductShoppingCartItemProps> = ({ product }) => {
  const classes = useStyles();
  const theme = useTheme();

  const deleteProduct = async () => {
    await shoppingCartApiClient.deleteItem(product.id);
    // TODO shopping cart number should be updated
  }

  return (
    <ProductInfoItem product={product} >
      <CardContent>
        <div className={classes.mainContent}>
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <TextField className={classes.quantity} id="outlined-basic" type="number" size="small" label="Quantitat" variant="outlined" />
            </Grid>
            <Grid item xs={6} md={3}>
              <Button onClick={deleteProduct}variant="contained" size="medium" color="primary">
                Elimnar
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </ProductInfoItem>
  );
}