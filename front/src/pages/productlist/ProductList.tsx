import React, { useContext, useState, useEffect, FunctionComponent } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { ProductFilterFields } from "../../models/product/ProductFilterFields";
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { OrderItems } from "./OrderItems";
import { useLocation } from "react-router-dom";
import { CircularProgress, makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { ProductFilter } from "../../components/ProductFilter";
import { AppContext } from '../../app-components';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import queryString from 'query-string';

const apiClient = new ProductApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
    },
    filterAndOrderBar: {
      paddingBottom: "1rem"
    },
  }),
);

const ProductList: FunctionComponent = () => {
  const { user: { isLoading: isLoadingUserData, user, userAddress, updateUserAddress } } = useContext(AppContext);
  const [productList, setProducts] = useState([] as Product[]);
  const [productFilterFields, setProductFilterFields] = useState({} as ProductFilterFields);
  const [redirectToProductPage, setRedirectToProductPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();

  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const categoryAsStr = query.get('category')
  const category = categoryAsStr ? parseInt(categoryAsStr, 10) : null;
  const name = query.get('name');
  const order = query.get('order');

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
        category ? await apiClient.getProductsBycategory(category, order) :
          name ? await apiClient.getProductsByName(name, order) :
            await apiClient.getProducts(order);
      setProducts(products)

      setIsLoading(false);
    }
    getProducts();
  }, [category, name, isLoadingUserData, user, userAddress, order]);

  useEffect(() => {
    retrieveProductFilterFieldsfromURL();
  }, []);

  const retrieveProductFilterFieldsfromURL = (): ProductFilterFields => {
    const query = queryString.parse(history.location.search);
    return {
      minPrice: query['minPrice'] ? Number(query['minPrice']) : undefined,
      maxPrice: query['maxPrice'] ? Number(query['maxPrice']) : undefined,
      rating: query['rating']? Number(query['rating']) : undefined,
      distance: query['distance'] ? Number(query['distance']) : undefined
    } as ProductFilterFields;
  }

  const onChangeProductFilterFields = (productFilterFields: ProductFilterFields): void => {
    setProductFilterFields(productFilterFields);
  }

  const onClickAplyFilter = (productFilterFields: ProductFilterFields): void => {
    doRedirectToProductPage(productFilterFields);
  }

  const doRedirectToProductPage = (productFilterFields: ProductFilterFields) => {
    let path: string = "" + history.location.search;

    if(productFilterFields.minPrice) {
      const regex = /(minPrice=)[^\&]+/;
      path = regex.test(path) ? 
          path.replace(regex, '$1' + productFilterFields.minPrice) :
          `${path}&minPrice=${productFilterFields.minPrice}`;
    }
  
    if(productFilterFields.maxPrice) {
      const regex = /(maxPrice=)[^\&]+/;
      path = regex.test(path) ? 
          path.replace(regex, '$1' + productFilterFields.maxPrice) :
          `${path}&maxPrice=${productFilterFields.maxPrice}`;
    }
    
    if(productFilterFields.rating) {
      const regex = /(rating=)[^\&]+/;
      path = regex.test(path) ? 
          path.replace(regex, '$1' + productFilterFields.rating) :
          `${path}&rating=${productFilterFields.rating}`;
    }
    
    if(productFilterFields.distance) {
      const regex = /(distance=)[^\&]+/;
      path = regex.test(path) ? 
          path.replace(regex, '$1' + productFilterFields.distance) :
          `${path}&distance=${productFilterFields.distance}`;
    }

    setProductFilterFields({} as ProductFilterFields);
    setRedirectToProductPage(
      path
    );
  }

  return (
    <div>
      <Grid container>
      <Grid item md={3} xs={12}>
      <div className={classes.filterAndOrderBar}>
        <OrderItems />
      </div>
      </Grid>
      <Grid item md={9} xs={12}>
      {redirectToProductPage && <Redirect push to={`/product-list${redirectToProductPage}`} /> }
      <ProductFilter 
        productFilterFields={productFilterFields}
        onChangeProductFilterFields={onChangeProductFilterFields}
        onClickAplyFilter={onClickAplyFilter}
      />
      </Grid>
      </Grid>
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
