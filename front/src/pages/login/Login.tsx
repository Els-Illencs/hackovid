import React, { FunctionComponent, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { LoginApiClient } from '../../api/LoginApiClient';
import { AppContext } from '../../app-components';
import { getLoginRedirect, clearLoginRedirect } from '../../services/LoginService';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { UserAddress } from '../../models/user/UserAddress';

const loginApiClient = new LoginApiClient();

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

const Login: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user: { updateUser } } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [password, setPassword] = useState("");

  const applyLogin = async (event) => {
    event.preventDefault();
    if (!isEmailCorrect()) {
      setIsEmailValidated(true);
      return;
    }
    try {
      await loginApiClient.login(email, password);
    } catch (e) {
      // TODO provisional until backend is done
      const address: UserAddress = {
        address: "Carrer de Blanquerna, Palma, Spain",
        latitude: undefined,
        longitude: undefined,
      }
      try {
        const results = await geocodeByAddress(address.address);
        if (results.length > 0) {
          const { lat, lng } = await getLatLng(results[0]);
          address.latitude = Number(lat);
          address.longitude = Number(lng);
        }
      } catch (ex) { }

      updateUser({
        id: 1,
        name: "Name",
        surname: "Surname",
        email: "example@example.com",
        address,
        phone: "666333999666",
      });
      const redirect = await getLoginRedirect();
      clearLoginRedirect();
      if (redirect !== undefined) {
        history.push(redirect);
      } else {
        history.push('/');
      }
    }
  }

  const isEmailCorrect = () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
            disabled={email === '' || password === ''}
            onClick={applyLogin}
          >
            Accedeix
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;