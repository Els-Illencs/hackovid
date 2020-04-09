import React, { useContext, MouseEventHandler } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import { AppContext } from "../context/AppContext";
import * as Logo from "./logo.png";
import { ShoppingCartNumberOfItems } from './ShoppingCartNumberOfItems';

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

type ApplicationBarProps = {
  onMenuButtonClick: MouseEventHandler<HTMLButtonElement>
};

export const ApplicationBar: React.FunctionComponent<ApplicationBarProps> = ({ onMenuButtonClick }) => {
  const classes = useStyles();
  const { user } = useContext(AppContext);

  const goToCardList = () => {
    // TODO when we have the router and the Card List screen
    console.log("goToCardList");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onMenuButtonClick} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            < img className={classes.logo} src={Logo.default} alt="" />

          </Typography>
          <div className={classes.shoppingCart}>
            <IconButton onClick={() => goToCardList()} edge="start" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <div className={classes.shoppingCartItems}>
              <ShoppingCartNumberOfItems text={9} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
