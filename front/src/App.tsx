import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { AppLayout } from './app-components';
import Categories from './views/categories/Categories';
import Home from './views/home/Home';
import { ShoppingCart } from './views/shoppingCart/ShoppingCart';
import { ProductItem } from './views/product/ProductItem';
import { ApplicationBar } from './app-components/layout/ApplicationBar';
import { Product } from './models/product/Product';

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

const product: Product = {
  id: 1,
  name: "Nom producte",
  image: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg",
  shopId: 1,
  categoryId: 1,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  active: true,
  price: 10
};

function App() {

  return (<>
    <MuiThemeProvider theme={theme}>
      {/*<ApplicationBar onTapMenu={() => console.log("onTapMenu")} />*/}
      <ProductItem product={product}/>
      {/*<AppLayout 
        onTapMenu={() => console.log("onTapMenu")}
        pages={[
          { label: "Inici", path: "/", content: (<Home />) },
          { label: "Categories", path: "/categories", content: (<Categories />) },
          { label: "CarretDeCompra", path: "/carret-de-compra", content: (<ShoppingCart />) },
        ]} />*/}
    </MuiThemeProvider>
  </>);
}

export default App;
