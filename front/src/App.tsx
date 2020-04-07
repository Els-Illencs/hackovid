import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";
import ServerMessage from './components/ServerMessage';
import UsersList from './components/UsersList';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  return (<>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationBar />
      <ServerMessage />
      <UsersList />
    </ThemeProvider>
  </>);
}

export default App;
