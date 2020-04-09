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
import { Product } from '../models/product/Product';

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
    },
    cover: {
      width: 300,
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    }
  }),
);

export interface ProductItemListProps {
  product: Product;
  shopName: string;
};

export const ProductItem: React.FunctionComponent<ProductItemListProps> = ({ product, shopName }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product.image}
        title={product.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
            <Typography component="h5" variant="h5">
              {product.name}
            </Typography>
            </Grid>
            <Grid item xs={4} justify="flex-end">
              <StarsIcon fontSize="small" color="primary"/><StarsIcon fontSize="small" color="primary"/>
              <Typography variant="caption" display="block" gutterBottom>
                {shopName}
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
        </CardContent>
        <div className={classes.mainContent}>
        <Grid container spacing={1}>
          <Grid item xs={4} md={8}>
            <Typography component="h5" variant="h5">
            {product.price} €/Kg
            </Typography>
          </Grid>         
          <Grid item xs={4} md={2}>
            <TextField id="outlined-basic" type="number" size="small" label="Quantitat" variant="outlined" />
          </Grid>
          <Grid item xs={4} md={2}>
          <Button variant="contained" size="medium" color="primary">
            Afegir
          </Button>
          </Grid>
        </Grid>
        </div>
      </div>
    </Card>
  );
}