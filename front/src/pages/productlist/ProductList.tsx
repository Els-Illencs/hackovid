import React, { useContext, useState, useEffect, FunctionComponent } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { useLocation } from "react-router-dom";
import { CircularProgress, makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { AppContext } from '../../app-components';

const apiClient = new ProductApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
    }
  }),
);

const ProductList: FunctionComponent = () => {
  const [productList, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const location: any = useLocation();
  const { user } = useContext(AppContext);

  const classes = useStyles();

  const category = location?.state?.category;
  const name = location?.state?.name;

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      if (category) {
        setProducts(await apiClient.getProductsBycategory(category));
      } else if (name) {
        setProducts(await apiClient.getProductsByName(name));
      } else {
        setProducts(await apiClient.getProducts());
      }
      setIsLoading(false);
    }
    checkIsAddressStoredInLocalStorage();
    getProducts();
  }, []);

  const checkIsAddressStoredInLocalStorage = (): void => {
    const value = user.userAddress == undefined || user.userAddress.address == undefined ||  user.userAddress.address == "" ? true : false;
    setOpenDialog(value);
  }

  return (
    <div>
      {isLoading ?
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <CircularProgress className={classes.loading} color="primary" />
        </Grid>
        :
        productList.map((product: Product) => (
          <ProductItem key={String(product.id)} product={product} />
        ))}
        <AddressRequestDialog open={openDialog} onClose={() => setOpenDialog(false)}/>
    </div>
  );
}

export default ProductList;