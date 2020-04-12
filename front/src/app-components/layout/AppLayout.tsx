import React, { FC, ReactNode, useState, useEffect } from "react";
import { ApplicationBar } from "./ApplicationBar";
import { Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import { makeStyles, Drawer, List, ListItem, ListItemText, Grid, Typography, Button, Divider, Container } from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";
import { AccountCircle } from '@material-ui/icons';
import { UserAddress } from "../../models/user/UserAddress";
import { UserApiClient } from "../../api/UserApiClient";
import { saveLoginRedirect } from "../../services/LoginService";

const ListDivider: FC = () => (<Divider style={{ margin: '10px 0' }} />);

export enum MenuShowOption {
  Always,
  OnlyWhenLogged,
  OnlyWhenNotLogged
}

type Page = {
  path: string
  content: ReactNode,
  fullScreen?: boolean,
  menuItem?: {
    label: string,
    right?: ReactNode,
    show?: MenuShowOption
  }
};

type AppLayoutProps = {
  pages: Page[]
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20
  },
  accountArea: {
    backgroundColor: theme.palette.primary.main
  },
  account: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 12,
    width: 30,
  },
  userName: {
    fontSize: 20,
    marginTop: 19,
    marginLeft: 16,
    fontStyle: "italic",
    textDecoration: "none"
  },
  userNameLink: {
    textDecoration: "none"
  }
}))

const shoppingCartApiClient = new ShoppingCartApiClient();
const userApiClient: UserApiClient = new UserApiClient();

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  const history = useHistory();

  const matchPageWithAppBar = useRouteMatch(
    props.pages.filter(p => !p.fullScreen).map(p => p.path));
  const classes = useStyles(props);
  const styles = useStyles(props);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [shoppingCartProducts, setShoppingCartProducts] = useState<ProductShoppingCart[]>([]);
  const [userAddress, setUserAddress] = useState<UserAddress | undefined>();
  const [isLoadingUserAddress, setIsLoadingUserAddress] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const getShoppingCartProducts = async () => {
      setShoppingCartProducts(await shoppingCartApiClient.getItems());
    }
    getShoppingCartProducts();
  }, []);

  useEffect(() => {
    const getUserAddressFromLocalStorage = async () => {
      setIsLoadingUserAddress(true);
      setUserAddress(await userApiClient.getStoredUserAddress());
      setIsLoadingUserAddress(false);
    }
    getUserAddressFromLocalStorage();
  }, []);

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      setIsLoadingUser(true);
      setUser(await userApiClient.getUser());
      setIsLoadingUser(false);
    }
    getUserFromLocalStorage();
  }, []);

  const disconnect = () => {
    updateUser(undefined);
    closeDrawer();
  }

  // TODO move AppContext in a different file / component
  const addProductToTheShoppingCart = (product: ProductShoppingCart) => {
    addProductsToTheShoppingCart([product]);
  }

  const addProductsToTheShoppingCart = (products: ProductShoppingCart[]) => {
    const nextShoppingCartProducts = shoppingCartProducts.slice();

    for (const product of products) {
      const index = nextShoppingCartProducts.findIndex(({ id }) => id === product.id);

      if (index !== -1) {
        updateProduct(index, shoppingCartProducts[index].quantity + product.quantity);
      } else {
        nextShoppingCartProducts.push(product);
      }
    }

    shoppingCartApiClient.saveItems(nextShoppingCartProducts);
    setShoppingCartProducts(nextShoppingCartProducts);
  }

  const deleteProductFromTheShoppingCart = (productId: number) => {
    const nextShoppingCartProducts = shoppingCartProducts.slice();
    const index = nextShoppingCartProducts.findIndex(({ id }) => id === productId);
    if (index === -1) {
      return;
    }
    nextShoppingCartProducts.splice(index, 1);
    shoppingCartApiClient.saveItems(nextShoppingCartProducts);
    setShoppingCartProducts(nextShoppingCartProducts);
  }

  const resetShoppingCart = () => {
    shoppingCartApiClient.saveItems([])
    setShoppingCartProducts([]);
  }

  const updateProductFromTheShoppingCart = (product: ProductShoppingCart) => {
    const index = shoppingCartProducts.findIndex(({ id }) => id === product.id);
    if (index === -1) {
      return;
    }
    updateProduct(index, product.quantity);
  }

  const updateProduct = (index: number, quantity: number) => {
    const nextShoppingCartProducts = shoppingCartProducts.slice();
    nextShoppingCartProducts[index].quantity = quantity;
    shoppingCartApiClient.saveItems(nextShoppingCartProducts);
    setShoppingCartProducts(nextShoppingCartProducts);
  }

  const updateUserAddress = (userAddress: UserAddress | undefined) => {
    userApiClient.saveUserAddress(userAddress);
    setUserAddress(userAddress);
  }

  const updateUser = (user: User | undefined) => {
    userApiClient.saveUser(user);
    setUser(user);
  }

  const saveLocationAndHideDrawer = () => {
    saveLoginRedirect(`${history.location.pathname}${history.location.search}`);
    setDrawerOpen(false)
  }

  return (<AppContext.Provider value={{
    user: {
      isLoading: isLoadingUser || isLoadingUserAddress,
      user,
      updateUser,
      userAddress,
      updateUserAddress,
    },
    shoppingCart: {
      products: shoppingCartProducts,
      addProduct: addProductToTheShoppingCart,
      addProducts: addProductsToTheShoppingCart,
      updateProduct: updateProductFromTheShoppingCart,
      deleteProduct: deleteProductFromTheShoppingCart,
      reset: resetShoppingCart
    }
  }}>
    {matchPageWithAppBar && <ApplicationBar onMenuButtonClick={openDrawer} />}
    <Container component="main" maxWidth="lg" className={classes.content}>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <div style={{ minWidth: 260 }}>
          <Grid container spacing={1} className={classes.accountArea}>
            <>
              <Grid item xs={2}>
                {!user ? <Link to="/login" onClick={saveLocationAndHideDrawer}>
                  <AccountCircle fontSize="large" className={styles.account} />
                </Link> : <AccountCircle fontSize="large" className={styles.account} />
                }
              </Grid>
              <Grid item xs={10}>
                <Typography className={styles.userName} variant="body1">
                  {user ? `Hola ${user.name}` : <Button component={Link} to="/login" onClick={saveLocationAndHideDrawer} className={styles.userNameLink}>Entra</Button>}
                </Typography>
              </Grid>
            </>
          </Grid>
          <List>
            {props.pages.filter(p => !!p.menuItem && (
              !p.menuItem.show 
              || (p.menuItem.show === MenuShowOption.OnlyWhenLogged && user !== undefined))
              || (p.menuItem?.show === MenuShowOption.OnlyWhenNotLogged && user === undefined)).map((p) => (
              <ListItem button component={Link} to={p.path} onClick={closeDrawer} key={p.path}>
                <ListItemText primary={p.menuItem!.label} />
                {p.menuItem!.right}
              </ListItem>
            ))}
            {user !== undefined && (<>
              <ListDivider />
              <ListItem button component={Link} to={"/"} onClick={disconnect} key={"key-disconnect"} >
                <ListItemText primary={"Desconectar"} />
              </ListItem>
            </>)}
          </List>
        </div>
      </Drawer>
      <Switch>
        {props.pages.map((p, i) =>
          <Route path={p.path} key={i}>
            {p.content}
          </Route>
        )}
      </Switch>
    </Container>

  </AppContext.Provider >);
};

export default AppLayout;
