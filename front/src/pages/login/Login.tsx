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
import { getLoginRedirect } from '../../services/LoginService';

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
}));

const Login: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user: { updateUser } } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const applyLogin = async (event) => {
    event.preventDefault();
    try {
      await loginApiClient.login(email, password);
    } catch (e) {
      // TODO provisional until backend is done
      updateUser({
        id: 1,
        name: "Name",
        surname: "Surname",
        email: "example@example.com",
        address: "Avinguda segona, 24A, 3B",
        phone: "666333999666",
      });
      const redirect = await getLoginRedirect();
      if (redirect !== undefined) {
        history.push(redirect);
      } else {
        history.push('/');
      }
    }
  }

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
            variant="outlined"
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
          <TextField
            variant="outlined"
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
            variant="contained"
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