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
  const { user: { isLoading: isLoadingUserData, user, userAddress, updateUserAddress } } = useContext(AppContext);
  const [productList, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();

  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();

  const categoryAsStr = query.get('category')
  const category = categoryAsStr ? parseInt(categoryAsStr, 10) : null;
  const name = query.get('name');

  useEffect(() => {
    if (!isLoadingUserData) {
      setOpenDialog(user === undefined && userAddress !== undefined && userAddress.address === '');
    }
  }, [isLoadingUserData, user, userAddress]);

  useEffect(() => {
    const isUserAddressMissing = user === undefined && userAddress !== undefined && userAddress.address === '';
    if (openDialog || isLoadingUserData || isUserAddressMissing) {
      return;
    }

    const getProducts = async () => {
      setIsLoading(true);

      const products =
        category ? await apiClient.getProductsBycategory(category) :
          name ? await apiClient.getProductsByName(name) :
            await apiClient.getProducts();
      setProducts(products)

      setIsLoading(false);
    }
    getProducts();
  }, [category, name, isLoadingUserData, user, userAddress]);

  console.log("ere", user, isLoadingUserData, userAddress);
  return (
    <div>
      {isLoading || isLoadingUserData ?
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
        <>
          {productList.map((product: Product) => (
            <ProductItem key={String(product.id)} product={product} />
          ))}
          {openDialog && <AddressRequestDialog open={openDialog} onClose={() => setOpenDialog(false)} onSelectAddress={updateUserAddress} />}
        </>
      }
    </div>
  );
}

export default ProductList;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
