import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { AppLayout } from './app-components';
import Categories from './views/categories/Categories';
import Home from './views/home/Home';
import { ShoppingCart } from './views/shoppingCart/ShoppingCart';

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
        onTapMenu={() => console.log("onTapMenu")}
        pages={[
          { label: "Inici", path: "/", content: (<Home />) },
          { label: "Categories", path: "/categories", content: (<Categories />) },
          { label: "CarretDeCompra", path: "/carret-de-compra", content: (<ShoppingCart />) },
        ]} />
    </MuiThemeProvider>
  </>);
}

export default App;
