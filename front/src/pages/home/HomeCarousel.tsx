import React, { useState, FC } from 'react';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import IconElement from './IconElement';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HomeCarousel: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AutoPlaySwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              iconSrc="/icons/credit-card.png"
              text="Pagament en línia rápid i segur!"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              iconSrc="/icons/box.png"
              text="T'ho portem a casa!"
            />
          </Grid>
        </Grid>   
        <Grid container>
          <Grid item xs={6}>
            <IconElement 
              iconSrc="/icons/basket-3.png"
              text="Unifiquem en una sola comanda diferents comerços!"
            />
          </Grid>
          <Grid item xs={6}>
            <IconElement 
              iconSrc="/icons/hands.png"
              text="Col·labora amb el petit comerç local!"
            />
          </Grid>
        </Grid>   
    </AutoPlaySwipeableViews>
  )
}

export default HomeCarousel;