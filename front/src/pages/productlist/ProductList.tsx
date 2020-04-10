import React, { useState, useEffect, FunctionComponent } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { useLocation } from "react-router-dom";
import { CircularProgress, makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { UserApiClient } from "../../api/UserApiClient";

const apiClient = new ProductApiClient();
const userApiClient= new UserApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
    }
  }),
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductList: FunctionComponent = () => {
  const [productList, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressStoredInLocalStorage, setIsAddressStoredInLocalStorage] = useState(false);
  const query = useQuery();

  const classes = useStyles();

  const categoryAsStr = query.get('category')
  const category = categoryAsStr ? parseInt(categoryAsStr, 10) : null;
  const name = query.get('name');

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);

      const products =
        category ? await apiClient.getProductsBycategory(category) :
        name ? await apiClient.getProductsByName(name) :
        await apiClient.getProducts();
      setProducts(products)

      setIsLoading(false);
      checkIsAddressStoredInLocalStorage();
    }
    getProducts();
  }, [category, name]);

  const checkIsAddressStoredInLocalStorage = (): void => {
    userApiClient.getStoredUserAddress().then(userAddress => {
      setIsAddressStoredInLocalStorage(userAddress.address == "");
    })
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
        <AddressRequestDialog view={isAddressStoredInLocalStorage}/>
    </div>
  );
}

export default ProductList;