import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    carousel: {
      backgroundColor: theme.palette.background.paper
    },
    carouselItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    largeIcon: {
      fontSize: '6rem',
      marginRight: '0.5rem'
    },
    text: {
      flex: '1 1 auto'
    },
    title: {
      marginBlockEnd: "0"
    },
    description: {
      marginBlockStart: "0"
    },
  }),
);

export const HomeCarrousel: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Carousel className={classes.carousel}>
      <div className={classes.root}>
        <div className={classes.carouselItem}>
          <CreditCardIcon className={classes.largeIcon}/>
          <div className={classes.text}>
            <h2 className={classes.title}>Pagament online o a la tenda</h2>
            <p className={classes.description}>Pots escollir el mètode de pagament que més et convengui</p>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.carouselItem}>
          <StoreMallDirectoryIcon className={classes.largeIcon}/>
          <div className={classes.text}>
            <h2 className={classes.title}>Comanda única</h2>
            <p className={classes.description}>Compra sense preocupar-te de quin comerç te cada producte</p>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.carouselItem}>
          <LocalShippingIcon className={classes.largeIcon}/>
          <div className={classes.text}>
            <h2 className={classes.title}>T'ho portam a casa (si vols)</h2>
            <p className={classes.description}>Evita sortir al carrer, nosaltres et portam a casa tot el que necessitis</p>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.carouselItem}>
          <UpdateIcon className={classes.largeIcon}/>
          <div className={classes.text}>
            <h2 className={classes.title}>Seguiment de la comanda</h2>
            <p className={classes.description}>Coneix en tot moment l'estat de la comanda per saber quan està preparada</p>
          </div>
        </div>
      </div>
    </Carousel>
  )
}