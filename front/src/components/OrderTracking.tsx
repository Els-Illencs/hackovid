import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    step: {
      paddingLeft: '0 !important' //Disculapu
    }
  }),
);

const PICK_UP_ORDER: number = 0;
const DELIVER_ORDER: number = 1;

const deliverOrderSteps: string[] = ['Pendent', 'Preparant', 'Llest', 'Repartint', 'Entregat'];
const pickUpOrderSteps: string[] = ['Pendent', 'Preparant', 'Llest', 'Entregat'];

function getSteps(orderType: number) {
  if(orderType == PICK_UP_ORDER) {
    return pickUpOrderSteps;
  } else if(orderType == DELIVER_ORDER) {
    return deliverOrderSteps;
  } else {
    return [];
  }
}

export interface OrderTrackingProps {
  orderType: number;
  trackingStep: number
};

export const OrderTracking: React.FunctionComponent<OrderTrackingProps> = ({ orderType, trackingStep }) => {
  const classes = useStyles();
  const steps = getSteps(orderType);

  return (
      <Stepper activeStep={trackingStep} className={classes.root} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} className={classes.step}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}