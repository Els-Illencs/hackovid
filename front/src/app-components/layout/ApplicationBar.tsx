import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { AppContext } from "../context/AppContext";
import * as Logo from "./logo.png";
import { ShoppingCartNumberOfItems } from './ShoppingCartNumberOfItems';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
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
    }
  }),
);

type MenuItem = {
  label: string,
  path: string
}

type ApplicationBarProps = {
  menuItems: readonly MenuItem[]
};

export const ApplicationBar: React.FunctionComponent<ApplicationBarProps> = ({ menuItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  const { user } = useContext(AppContext);

  const goToCardList = () => {
    // TODO when we have the router and the Card List screen
    console.log("goToCardList");
  }

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={openDrawer} edge="start" color="inherit" aria-label="menu">
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
              <ShoppingCartNumberOfItems text={9} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <List>
          {menuItems.map((mi) => (
            <ListItem button component={Link} to={mi.path} onClick={closeDrawer} key={mi.path}>
              <ListItemText primary={mi.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
