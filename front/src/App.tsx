import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppLayout } from './app-components';
import Home from './pages/home/Home';
import { ShoppingCart } from './pages/shoppingCart/ShoppingCart';
import ProductList from './pages/productlist/ProductList';
import { Checkout } from './pages/checkout/Checkout';
import StreetRequestDialog from './components/StreetRequestDialog';

const theme = createMuiTheme({});

function App() {

  return (<>
    <MuiThemeProvider theme={theme}>
    <StreetRequestDialog />
    </MuiThemeProvider>
  </>);
}

export default App;
