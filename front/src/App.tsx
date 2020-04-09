import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppLayout } from './app-components';
import Home from './pages/home/Home';
import { ShoppingCart } from './pages/shoppingCart/ShoppingCart';
import ProductList from './pages/productlist/ProductList';

const theme = createMuiTheme({});

function App() {

  return (<>
    <MuiThemeProvider theme={theme}>
    <AppLayout
        pages={[
          { label: "Inici", path: "/", content: (<Home />) },
          { label: "CarretDeCompra", path: "/carret-de-compra", content: (<ShoppingCart />) },
          { label: "LlistatDeProductes", path: "/productes", content: (<ProductList />) },
        ]} />
    </MuiThemeProvider>
  </>);
}

export default App;
