import React, { useState, FC, ReactNode } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: '4rem'
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


const HomeCarousel: FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AutoPlaySwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              icon={<img src="/icons/credit-card.png" className={classes.icon} />}
              text="Pagament en línia rápid i segur!"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              icon={<img src="/icons/box.png" className={classes.icon} />}
              text="T'ho portem a casa!"
            />
          </Grid>
        </Grid>   
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              icon={<img src="/icons/basket-3.png" className={classes.icon} />}
              text="Fés una sola comanda per distints comerços, t'ho unifiquem!"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              icon={<img src="/icons/hands.png" className={classes.icon} />}
              text="Col·labora amb el petit comerç local!"
            />
          </Grid>
        </Grid>   
    </AutoPlaySwipeableViews>
  )
}

export default HomeCarousel;