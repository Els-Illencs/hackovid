import React, { MouseEventHandler, useRef, useEffect, useState, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import * as Logo from "./logo.png";
import { ShoppingCartNumberOfItems } from './ShoppingCartNumberOfItems';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { AppContext } from '..';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      width: "160px",
      paddingTop: "8px"
    },
    shoppingCart: {
      position: "relative"
    },
    shoppingCartItems: {
      position: "absolute",
      bottom: "30px",
      right: "7px",
    },
    searchBarWrapper: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 24px 10px 24px'
    },
    searchBarInput: {
      flex: 1,
      margin: '0 10px',
    },
    searchBarIconButton: {
      padding: '0 10px',
    },
  }),
);

type ApplicationBarProps = {
  onMenuButtonClick: MouseEventHandler<HTMLButtonElement>
};

export const ApplicationBar: React.FunctionComponent<ApplicationBarProps> = ({ onMenuButtonClick }) => {
  /* Since the AppBar is 'fixed, we need to get its height dinamically and set a div with that value,
  so the AppBar is not put on top of the main page */
  const { shoppingCart: { products } } = useContext(AppContext);

  const classes = useStyles();
  const [height, setHeight] = useState(0);
  const appBarRef = useRef<HTMLElement>(null);

  const goToCardList = () => {
    // TODO when we have the router and the Card List screen
    console.log("goToCardList");
  }

  useEffect(() => {
    if (!appBarRef.current?.offsetHeight) {
      return;
    }
    setHeight(appBarRef.current.offsetHeight);
  }, [appBarRef]);

  return (
    <>
      <div style={{ height }} />
      <AppBar position="fixed" ref={appBarRef} >
        <Toolbar>
          <IconButton onClick={onMenuButtonClick} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              < img className={classes.logo} src={Logo.default} alt="" />
            </Link>
          </Typography>
          <div className={classes.shoppingCart}>
            <Link to="/carret-de-compra">
              <IconButton onClick={() => goToCardList()} edge="start" color="inherit" aria-label="menu">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <div className={classes.shoppingCartItems}>
              <ShoppingCartNumberOfItems text={products.length} />
            </div>
          </div>
        </Toolbar>
        <Paper className={classes.searchBarWrapper}>
          <InputBase
            className={classes.searchBarInput}
            placeholder="Què estàs cercant?"
          />
          <IconButton className={classes.searchBarIconButton} type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </AppBar>
    </>
  );
}
