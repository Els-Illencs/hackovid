import React, { FC, ReactNode, useState, useEffect } from "react";
import { ApplicationBar } from "./ApplicationBar";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";

type Page = {
  label: string,
  path: string
  content: ReactNode
};

type AppLayoutProps = {
  pages: Page[]
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20
  }
}))

const shoppingCartApiClient = new ShoppingCartApiClient();

const AppLayout: FC<AppLayoutProps> = (props) => {
  const styles = useStyles(props);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shoppingCartProducts, setShoppingCartProducts] = useState<ProductShoppingCart[]>([]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const getShoppingCartProducts = async () => setShoppingCartProducts(await shoppingCartApiClient.getItems());
    getShoppingCartProducts();
  }, []);

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
    user: mockUser, // TODO use real data
    shoppingCart: {
      products: shoppingCartProducts,
      addProduct: addProductToTheShoppingCart,
      updateProduct: updateProductFromTheShoppingCart,
      deleteProduct: deleteProductFromTheShoppingCart,
    }
  }}>
    <ApplicationBar onMenuButtonClick={openDrawer} />
    <main className={styles.content}>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <List>
          {props.pages.map((p) => (
            <ListItem button component={Link} to={p.path} onClick={closeDrawer} key={p.path}>
              <ListItemText primary={p.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Switch>
        {props.pages.map((p, i) =>
          <Route path={p.path} key={i} exact={p.path === '/'}>
            {p.content}
          </Route>
        )}
      </Switch>
    </main>

  </AppContext.Provider >);
};

const mockUser: User = {
  id: 1,
  name: "Name Surname1 Surname2",
  email: "example@example.com",
  address: "Avinguda segona, 24A, 3B",
  phone: "666333999666",
}

export default AppLayout;
