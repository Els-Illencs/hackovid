import React, { FC, ReactNode, useState, useEffect } from "react";
import { ApplicationBar } from "./ApplicationBar";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { makeStyles, Drawer, List, ListItem, ListItemText, Grid, Typography } from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";
import { AccountCircle } from '@material-ui/icons';
import { common } from '@material-ui/core/colors';

type Page = {
  path: string
  content: ReactNode,
  fullScreen?: boolean,
  menuItem?: {
    label: string,
    right?: ReactNode
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
    color: common.white
  },
  userName: {
    fontSize: 20,
    marginTop: 19,
    marginLeft: 16,
    fontStyle: "italic",
    color: common.white
  }
  }))

const shoppingCartApiClient = new ShoppingCartApiClient();

const AppLayout: React.FunctionComponent<AppLayoutProps> = (props) => {
  const matchPageWithAppBar = useRouteMatch(
    props.pages.filter(p => !p.fullScreen).map(p => p.path));
  const classes = useStyles(props);
  const styles = useStyles(props);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(mockUser); // TODO add logic to get the real data of the user
  const [shoppingCartProducts, setShoppingCartProducts] = useState<ProductShoppingCart[]>([]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const getShoppingCartProducts = async () => setShoppingCartProducts(await shoppingCartApiClient.getItems());
    getShoppingCartProducts();
  }, []);

  // TODO move AppContext in a different file / component
  const addProductToTheShoppingCart = (product: ProductShoppingCart) => {
    const index = shoppingCartProducts.findIndex(({ id }) => id === product.id);
    if (index !== -1) {
      updateProduct(index, shoppingCartProducts[index].quantity + product.quantity);
    } else {
      const nextShoppingCartProducts = shoppingCartProducts.slice();
      nextShoppingCartProducts.push(product);
      shoppingCartApiClient.saveItems(nextShoppingCartProducts);
      setShoppingCartProducts(nextShoppingCartProducts);
    }
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

  return (<AppContext.Provider value={{
    user: {
      user,
      updateUser: (user: User | undefined) => setUser(user),
    },
    shoppingCart: {
      products: shoppingCartProducts,
      addProduct: addProductToTheShoppingCart,
      updateProduct: updateProductFromTheShoppingCart,
      deleteProduct: deleteProductFromTheShoppingCart,
    }
  }}>
    {matchPageWithAppBar && <ApplicationBar onMenuButtonClick={openDrawer} />}
    <main className={classes.content}>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <div style={{ minWidth: 260 }}>
          <Grid container spacing={1} className={classes.accountArea}>
            <Grid item xs={2}>
              <AccountCircle fontSize="large" className={styles.account} />
            </Grid>
            <Grid item xs={10}>
              {user && <Typography className={styles.userName} variant="body1" color="textSecondary">
                Hola {user.name}
              </Typography>
              }
            </Grid>
          </Grid>
          <List>
            {props.pages.filter(p => !!p.menuItem).map((p) => (
              <ListItem button component={Link} to={p.path} onClick={closeDrawer} key={p.path}>
                <ListItemText primary={p.menuItem!.label} />
                {p.menuItem!.right}
              </ListItem>
            ))}
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
    </main>

  </AppContext.Provider >);
};

const mockUser: User = {
  id: 1,
  name: "Name",
  surname: "Surname",
  email: "example@example.com",
  address: "Avinguda segona, 24A, 3B",
  phone: "666333999666",
}

export default AppLayout;
