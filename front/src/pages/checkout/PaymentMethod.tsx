import React from "react";
import { makeStyles, DialogActions, Button, Dialog, DialogTitle, DialogContent, Input, FormControl, Select, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 160,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectWidth: {
    minWidth: "120px !important",
  },
}));

export type PaymentMethodProps = {
  onSavePaymentMethod: (option: PaymentMethodType) => void;
  onClose: () => void;
}

export enum PaymentMethodType {
  CARD = "CARD",
  CASH = "CASH",
}

export const PaymentMethod: React.FunctionComponent<PaymentMethodProps> = ({ onSavePaymentMethod, onClose }) => {
  const classes = useStyles();
  const [option, setOption] = React.useState<PaymentMethodType | undefined>();

  const save = () => {
    onSavePaymentMethod(option!);
    onClose();
  }

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={true} onClose={onClose}>
      <DialogTitle>Seleccioni el mètode de pagament</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.selectWidth} htmlFor="demo-dialog-native">Tipus de pagament</InputLabel>
            <Select
              native
              className={classes.selectWidth}
              value={option}
              onChange={(event) => { 
                setOption(PaymentMethodType[String(event.target.value)]) 
              }}
              input={<Input id="demo-dialog-native" />}
            >
              <option value={''}>-</option>
              <option value={PaymentMethodType.CARD}>Tarjeta</option>
              <option value={PaymentMethodType.CASH}>Efectiu</option>
            </Select>
          </FormControl>
        </form>
      </DialogContent >
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={save} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog >
  );
}