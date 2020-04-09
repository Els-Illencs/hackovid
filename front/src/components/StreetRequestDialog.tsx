import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { UserApiClient } from '../api/UserApiClient';
import { UserAddress } from '../models/user/UserAddress';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '500px',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function StreetRequestDialog() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");

  const apiClient: UserApiClient = new UserApiClient();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAddressInLocalStorage();
  };

  const setAddressInLocalStorage = () => {
    setAddress("Carrer Blanquerna 53");
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
        const userAddress: UserAddress = {
            address: address,
            latitude: Number(lat),
            longitude: Number(lng)
        };
        apiClient.saveUserAddress(userAddress);
    });
  };

  function setAddressDescription(prediction) {
    if(prediction) {
        setAddress(prediction.description);
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Indiquens a on vius
        </DialogTitle>
        <DialogContent dividers>
        <GooglePlacesAutocomplete
            autocompletionRequest={{
                componentRestrictions: {
                  country: ['es'],
                }
            }}
            inputStyle={{
                fontSize: '18px',
                padding: '10px 10px 10px 5px',
                display: 'block',
                width: '100%',
                border: 'none',
                borderBottom: '1px solid #757575'
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Guardar direcció
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}