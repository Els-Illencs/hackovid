import React, { useState, FC, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import { Typography, Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeIcon: {
      fontSize: '6rem'
    }
  }),
);

const IconElement: FC<{icon: ReactNode, text: string}> = ({icon, text}) => (
  <Grid container direction="row" justify="center">
    <Grid item>
      {icon}
    </Grid>
    <Grid item xs={12}>
      <Typography align="center">{text}</Typography>
    </Grid>
  </Grid>)


const HomeCarousel: React.FunctionComponent = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AutoPlaySwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              icon={<CreditCardIcon className={classes.largeIcon} />}
              text="Pagament online"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              icon={<LocalShippingIcon className={classes.largeIcon} />}
              text="T'ho portem a casa"
            />
          </Grid>
        </Grid>   
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              icon={<StoreMallDirectoryIcon className={classes.largeIcon} />}
              text="Comanda única"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              icon={<PeopleIcon className={classes.largeIcon} />}
              text="Col·labora"
            />
          </Grid>
        </Grid>   
    </AutoPlaySwipeableViews>
  )
}

export default HomeCarousel;