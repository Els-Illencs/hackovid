import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppLayout } from './app-components';
import Home from './pages/home/Home';
import { ShoppingCart } from './pages/shoppingCart/ShoppingCart';
import ProductList from './pages/productlist/ProductList';
import { Checkout } from './pages/checkout/Checkout';

const theme = createMuiTheme({});

function App() {

  return (<>
    <MuiThemeProvider theme={theme}>
    <AppLayout
        pages={[
          { path: "/", content: (<Home />), menuItem: { label: "Inici" } },
          { path: "/shopping-cart", content: (<ShoppingCart />), menuItem: { label: "Cistella" } },
          { path: "/product-list", content: (<ProductList />) },
          { path: "/checkout", content: (<Checkout />) }
        ]} />
    </MuiThemeProvider>
  </>);
}

export default App;
