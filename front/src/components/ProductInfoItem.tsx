import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Product } from '../models/product/Product';
import { Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginBottom: 16,
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
    }
  }),
);

export interface ProductInfoItemProps {
  product: Product;
};

export const ProductInfoItem: React.FunctionComponent<ProductInfoItemProps> = ({ product, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.image}>
        <CardMedia
          className={classes.cover}
          image={product.image}
          title={product.name}
        />
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography component="p">
                {product.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                {product.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Rating
                value={product.rating}
                precision={0.5}
                disabled={true}
              />
              <Typography variant="caption" display="block" gutterBottom>
                {product.shopname}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h5" variant="h5">
              {product.price} €/Kg
                </Typography>
          </Grid>
        </CardContent>
        {children}
      </div>
    </Card>
  );
}