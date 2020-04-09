import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { ApplicationBar } from './global/components/applicationbar/ApplicationBar';
import Categories from './views/categories/Categories';
import ProductItem from './views/product/ProductItem';

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
      <ApplicationBar onTapMenu={() => console.log("onTapMenu")} />
      <ProductItem />
    </MuiThemeProvider>
  </>);
}

export default App;
