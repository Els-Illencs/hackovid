import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppLayout, AppTheme } from './app-components';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { ShoppingCart } from './pages/shoppingCart/ShoppingCart';
import ProductList from './pages/productlist/ProductList';
import { Checkout } from './pages/checkout/Checkout';
import { Redirect, useLocation } from 'react-router-dom';
import PackageDetail from './pages/packageDetail/PackageDetail';

function App() {
  const { pathname } = useLocation();

  return (<>
    <MuiThemeProvider theme={AppTheme}>
      <AppLayout
          pages={[
            { path: "/home", content: (<Home />), menuItem: { label: "Inici" } },
            { path: "/shopping-cart", content: (<ShoppingCart />), menuItem: { label: "Cistella" } },
            { path: "/login", content: (<Login />), fullScreen: true },
            { path: "/package-detail", content: (<PackageDetail />) },
            { path: "/product-list", content: (<ProductList />) },
            { path: "/checkout", content: (<Checkout />) }
          ]} />
    </MuiThemeProvider>
    {pathname === '/' && <Redirect to="/home" />}
  </>);
}

export default App;