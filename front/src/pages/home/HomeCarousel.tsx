import React, { useState, FC } from 'react';
import { Grid, useTheme, useMediaQuery } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import IconElement from './IconElement';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const carouselElements = [
  { iconSrc: "/icons/credit-card.png", text: "Pagament en línia ràpid i segur!" },
  { iconSrc: "/icons/box.png", text: "T'ho portem a casa!" },
  { iconSrc: "/icons/basket-3.png", text: "Unifiquem en una sola comanda diferents comerços!" },
  { iconSrc: "/icons/hands.png", text: "Col·labora amb el petit comerç local!" }
];

const HomeCarousel: FC = () => {
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const carouselElementsNum = matchUpSm ? 4 : 2;

  return (
    <AutoPlaySwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
      {splitInChunks(carouselElements, carouselElementsNum).map(elements => 
        <Grid container>
          {elements.map(e => 
            <Grid item container justify="center" xs={6} sm={3}>
              <div style={{maxWidth: 210}}>
                <IconElement {...e} />
              </div>
            </Grid>
          )}
        </Grid>
      )}
    </AutoPlaySwipeableViews>
  )
}

export default HomeCarousel;

function splitInChunks<T>(array: readonly T[], chunkSize: number) {
  const chunksArray: T[][] = [];

  let currentChunk: T[] = [];
  for (const element of array) {
    currentChunk.push(element);
    if (currentChunk.length == chunkSize) {
      chunksArray.push(currentChunk);
      currentChunk = [];
    }
  }

  if (currentChunk.length > 0) {
    chunksArray.push(currentChunk);
  }

  return chunksArray;
}