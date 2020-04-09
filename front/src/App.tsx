import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { AppLayout } from './app-components';
import Home from './pages/home/Home';
import { ShoppingCart } from './pages/shoppingCart/ShoppingCart';
import ProductList from './pages/productlist/ProductList';

const theme = createMuiTheme({
  palette: {
      primary: blue,
      secondary: blue,
      error: red
  },
  typography: {
      fontFamily: 'Architects Daughter',
  },
});

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
