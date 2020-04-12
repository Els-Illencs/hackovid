import React, { FunctionComponent, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { UserApiClient } from '../../api/UserApiClient';
import { AppContext } from '../../app-components';
import { getLoginRedirect, clearLoginRedirect } from '../../services/LoginService';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { UserAddress } from '../../models/user/UserAddress';

const userApiClient = new UserApiClient();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  emailError: {
    color: "red"
  }
}));

const SignUp: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user: { updateUser } } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isErrorInSignUp, setIsErrorInSignUp] = useState(false);

  const applyRegister = async (event) => {
    event.preventDefault();
    if (!isEmailCorrect() || !arePasswordsMatching()) {
      setIsEmailValidated(true);
      setIsPasswordValidated(true);
      return;
    }
    try {
      const idUser = await userApiClient.register(name, surname, email, password, phone, address);

      const addressWithLatAndLng: UserAddress = {
        address,
        latitude: undefined,
        longitude: undefined,
      }
      try {
        const results = await geocodeByAddress(addressWithLatAndLng.address);
        if (results.length > 0) {
          const { lat, lng } = await getLatLng(results[0]);
          addressWithLatAndLng.latitude = Number(lat);
          addressWithLatAndLng.longitude = Number(lng);
        }
      } catch (ex) { }
      updateUser({
        id: idUser,
        name,
        surname,
        email,
        address: addressWithLatAndLng,
        phone,
      });

      history.push('/');
    } catch (e) {
      setIsErrorInSignUp(true);
      // TODO show some message if this error happens
    }
  }

  const isEmailCorrect = () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const arePasswordsMatching = () => password === password2;

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registra't
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Cognoms"
            name="surname"
            autoComplete="surname"
            autoFocus
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Correu electrònic"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {isEmailValidated && !isEmailCorrect() && <Typography component="p" className={classes.emailError}>
            El format del correu electronic no és vàlid
          </Typography>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Direcció"
            name="address"
            autoComplete="address"
            autoFocus
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Telèfon"
            name="phone"
            autoComplete="phone"
            autoFocus
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contrasenya"
            name="password"
            autoComplete="password"
            type="password"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password2"
            label="Repeteix la contrasenya"
            name="password2"
            autoComplete="password2"
            type="password"
            autoFocus
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
          />
          {isPasswordValidated && !arePasswordsMatching() && <Typography component="p" className={classes.emailError}>
            Les contrasenyes no coincideixen
          </Typography>}
          <Button
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
            disabled={email === '' || password === ''}
            onClick={applyRegister}
          >
            Crear compte
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;