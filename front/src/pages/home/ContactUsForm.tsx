import React, { FC, useState, FormEvent } from "react";
import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Snackbar } from "@material-ui/core";

const ContactUsForm: FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [confirmationMessageIsOpen, setConfirmationMessageIsOpen] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConfirmationMessageIsOpen(true);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <Container maxWidth="xs">
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField 
                    label="Nom i cognoms" 
                    value={name}
                    required 
                    fullWidth
                    onChange={e => setName(e.target.value)} />
                <TextField 
                    label="Direcció de correu electrònic"
                    value={email} 
                    required 
                    fullWidth
                    onChange={e => setEmail(e.target.value)} />  
                <FormControl required fullWidth>
                    <InputLabel id="home-contact-us-reason-label">Motiu de la consulta</InputLabel>      
                    <Select 
                        labelId="demo-simple-select-label"
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
                
                <Grid container justify="center" style={{ marginTop: 15 }}>
                    <Button 
                        type="submit"
                        variant="outlined" 
                        disabled={!name || !email || !reason || !message}>
                        ENVIAR
                    </Button>
                </Grid>
                <Snackbar
                    message="Gràcies pel seu missatge! En breus ens posarem en contacte amb vostè."
                    autoHideDuration={3000}
                    open={confirmationMessageIsOpen}
                    onClose={() => setConfirmationMessageIsOpen(false)} />
            </form>
        </Container>
    )
}

export default ContactUsForm;