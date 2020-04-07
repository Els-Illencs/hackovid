import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";
import ServerMessage from './components/ServerMessage';
import UsersList from './components/UsersList';
import { ApplicationBar } from './global/components/applicationbar/ApplicationBar';
import { AppContext } from './global/context/AppContext';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  return (<>
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{
        user: {
          name: 'User example',
        }
      }}>
        <CssBaseline />
        <ApplicationBar />
        <ServerMessage />
        <UsersList />
      </AppContext.Provider>
    </ThemeProvider>
  </>);
}

export default App;
