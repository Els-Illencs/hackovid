import React, { FC, useState, FormEvent } from "react";
import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Snackbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { ContactApiClient } from '../../api/ContactApiClient';

const apiClient = new ContactApiClient();


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        marginBottom: theme.spacing(1)
      },
    },
  }),
);

const ContactUsForm: FC = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [confirmationMessageIsOpen, setConfirmationMessageIsOpen] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiClient.createContact(name, email, reason, message);
        setConfirmationMessageIsOpen(true);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <Container component="form" maxWidth="sm" className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <TextField 
                label="Nom i cognoms" 
                value={name}
                required 
                fullWidth
                onChange={e => setName(e.target.value)} />
            <TextField 
                label="Direcció de correu electrònic"
                type="email"
                value={email} 
                required 
                fullWidth
                onChange={e => setEmail(e.target.value)} />  
            <FormControl required fullWidth>
                <InputLabel id="home-contact-us-reason-label">Motiu de la consulta</InputLabel>      
                <Select 
                    label="home-contact-us-reason-label"
                    value={reason}
                    onChange={e => setReason(e.target.value as any)}>
                    <MenuItem value="1">Vull col·laborar com a comerç</MenuItem>
                    <MenuItem value="2">Vull col·laborar com a repartidor</MenuItem>
                    <MenuItem value="3">Altres</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                label="Escriu el teu missatge" 
                value={message}
                required 
                fullWidth 
                multiline 
                rows="6"
                onChange={e => setMessage(e.target.value)} />
            
            <Grid container justify="center">
                <Button 
                    type="submit"
                    disabled={!name || !email || !reason || !message}>
                    ENVIAR
                </Button>
            </Grid>
            <Snackbar
                message="Gràcies pel seu missatge! En breus ens posarem en contacte amb vostè."
                autoHideDuration={3000}
                open={confirmationMessageIsOpen}
                onClose={() => setConfirmationMessageIsOpen(false)} />
        </Container>
    )
}

export default ContactUsForm;