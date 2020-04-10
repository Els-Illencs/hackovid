import React, { useContext } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { UserApiClient } from '../api/UserApiClient';
import { UserAddress } from '../models/user/UserAddress';
import { AppContext } from '../app-components';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
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

export interface AddressRequestDialogProps {
  open: boolean;
  onClose: () => void
};

export const AddressRequestDialog: React.FunctionComponent<AddressRequestDialogProps> = ({ open, onClose }) => {
  const [address, setAddress] = React.useState("");
  const { user } = useContext(AppContext);
  
  const handleClose = () => {
    setAddressInLocalStorage();
    onClose();
  };

  const setAddressInLocalStorage = () => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      saveUserAddressobject(address, Number(lat), Number(lng))

    })
    .catch(() => {
      saveUserAddressobject(address, undefined, undefined)
    });
  };

  const saveUserAddressobject = (address: string, latitude?:number, longitude?:number): void => {
    const userAddress: UserAddress = {
      address: address,
      latitude: latitude,
      longitude: longitude
    };
    user.updateUserAddress(userAddress);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Indiquens a on vius
        </DialogTitle>
        <DialogContent dividers>
        <GooglePlacesAutocomplete
            onSelect={(({ description }) => (
              setAddress(description)
            )) as any}
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
                borderBottom: '1px solid #757575',
                outline:'none'
            }}
            suggestionsClassNames={{container: '', suggestion: '', suggestionActive: '' }}
        />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" disabled={address == ""}>
            Guardar direcció
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}