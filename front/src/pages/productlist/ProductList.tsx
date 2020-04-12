import React, { useContext, useState, useEffect, FunctionComponent } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { ProductFilterFields } from "../../models/product/ProductFilterFields";
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { OrderItems } from "./OrderItems";
import { CircularProgress, makeStyles, Theme, createStyles, Grid, Typography } from "@material-ui/core";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { ProductFilter } from "../../components/ProductFilter";
import { AppContext } from '../../app-components';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

const apiClient = new ProductApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterAndOrderBar: {
      paddingBottom: "1rem"
    },
    changeAddress: {
      marginBottom: "1em"
    },
    link: {
      textDecoration: "underline",
      cursor: "pointer",
      fontWeight: "bold"
    },
    orderBar: {
      width: "100%"
    }
  }),
);

const MAX_DISTANCE_FILTER_FIELD: number = 20;

const ProductList: FunctionComponent = () => {
  const query = useQuery();

  const retrieveProductFilterFieldsfromURL = (): ProductFilterFields => {
    const productFilterFields: ProductFilterFields = {
      minPrice: query.get('minPrice') ? Number(query.get('minPrice')) : undefined,
      maxPrice: query.get('maxPrice') ? Number(query.get('maxPrice')) : undefined,
      rating: query.get('rating') ? Number(query.get('rating')) : undefined,
      distance: query.get('distance') ? Number(query.get('distance')) : MAX_DISTANCE_FILTER_FIELD
    };
    return productFilterFields;
  }

  const { user: { isLoading: isLoadingUserData, user, userAddress, updateUserAddress } } = useContext(AppContext);
  const [productList, setProducts] = useState([] as Product[]);

  const [productFilterFields, setProductFilterFields] = useState(retrieveProductFilterFieldsfromURL());
  const [redirectToProductPage, setRedirectToProductPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const address = user ? user?.address : userAddress;
      const products =
        category ? await apiClient.getProductsBycategory(category, order, productFilterFields, address) :
          name ? await apiClient.getProductsByName(name, order, productFilterFields, address) :
            await apiClient.getProducts(order, productFilterFields, address);
      setProducts(products)

      setIsLoading(false);
    }
    getProducts();
  }, [category, name, isLoadingUserData, user, userAddress, order, productFilterFields]);

  const onChangeProductFilterFields = (productFilterFields: ProductFilterFields): void => {
    //setProductFilterFields(Object.assign({}, productFilterFields));
  }

  const onClickChangeAddress = (): void => {
    setOpenDialog(true);
    setProducts([]);
  }

  const onClickAplyFilter = (productFilterFields: ProductFilterFields): void => {
    doRedirectToProductPage(productFilterFields);
  }

  const doRedirectToProductPage = (productFilterFields: ProductFilterFields) => {
    setProductFilterFields(Object.assign({}, productFilterFields));
    let path: string = "" + history.location.search;

    if (productFilterFields.minPrice) {
      const regex = /(minPrice=)[^\&]+/;
      path = regex.test(path) ?
        path.replace(regex, '$1' + productFilterFields.minPrice) :
        `${path}&minPrice=${productFilterFields.minPrice}`;
    }

    if (productFilterFields.maxPrice) {
      const regex = /(maxPrice=)[^\&]+/;
      path = regex.test(path) ?
        path.replace(regex, '$1' + productFilterFields.maxPrice) :
        `${path}&maxPrice=${productFilterFields.maxPrice}`;
    }

    if (productFilterFields.rating) {
      const regex = /(rating=)[^\&]+/;
      path = regex.test(path) ?
        path.replace(regex, '$1' + productFilterFields.rating) :
        `${path}&rating=${productFilterFields.rating}`;
    }

    if (productFilterFields.distance) {
      const regex = /(distance=)[^\&]+/;
      path = regex.test(path) ?
        path.replace(regex, '$1' + productFilterFields.distance) :
        `${path}&distance=${productFilterFields.distance}`;
    }

    setRedirectToProductPage(
      path
    );
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
          {redirectToProductPage && <Redirect push to={`/product-list${redirectToProductPage}`} />}
          <ProductFilter
            productFilterFields={productFilterFields}
            onChangeProductFilterFields={onChangeProductFilterFields}
            onClickAplyFilter={onClickAplyFilter}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <div className={classes.filterAndOrderBar}>
            <OrderItems />
          </div>
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
          <CircularProgress color="primary" />
        </Grid>
        :
        <>
          {userAddress ?
              <Grid
              container
              spacing={0}
              direction="column"
            >
              <Typography className={classes.changeAddress}>
                Mostrant productes prop de {userAddress.address}.&nbsp;
                <span 
                  onClick={onClickChangeAddress}
                  className={classes.link}
                >
                  Vols canviar-la?
                </span>
              </Typography>
            </Grid> :
            <></>
          }
          {
            productList.length ?
              productList.map((product: Product) => (
                <ProductItem key={String(product.id)} product={product} />
              )) : 
              !openDialog ? "No s'han trobat resultats amb aquests criteris de cerca" : ""
          }
          {openDialog && <AddressRequestDialog open={openDialog} onClose={() => setOpenDialog(false)} onSelectAddress={updateUserAddress} />}
        </>
      }
    </div>
  );
}

export default ProductList;
