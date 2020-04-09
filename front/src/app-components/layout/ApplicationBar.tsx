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
import { common } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";


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
  const history = useHistory();


  const classes = useStyles();
  const [height, setHeight] = useState(0);
  const appBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!appBarRef.current?.offsetHeight) {
      return;
    }
    setHeight(appBarRef.current.offsetHeight);
  }, [appBarRef]);

  const redirectToProductPage = (e: any) => {
    e.preventDefault();
    history.push('/productes');
  };
  

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
              <img className={classes.logo} src={Logo.default} alt="" />
            </Link>
          </Typography>
          <div className={classes.shoppingCart}>
            <IconButton component={Link} to="/carret-de-compra" edge="start" style={{color: common.white}} aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <div className={classes.shoppingCartItems}>
              <ShoppingCartNumberOfItems text={products.length} />
            </div>
          </div>
        </Toolbar>
        <form onSubmit={redirectToProductPage}>
          <Paper className={classes.searchBarWrapper}>
              <InputBase
                className={classes.searchBarInput}
                placeholder="Què estàs cercant?"
              />
              <IconButton className={classes.searchBarIconButton} type="submit" aria-label="search"> 
                <SearchIcon/>
              </IconButton>
          </Paper>
        </form>
      </AppBar>
    </>
  );
}
