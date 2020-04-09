import React, { FC, useState, useEffect, ReactNode } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import HomeCarousel from './HomeCarousel';
import { Category } from '../../models/category/Category';
import { CategoryApiClient } from '../../api/CategoryApiClient';
import { Typography, Box, makeStyles, createStyles, Theme, Grid, Divider, Button } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LoopIcon from '@material-ui/icons/Loop';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { HashLink } from "react-router-hash-link";

const apiClient = new CategoryApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeIcon: {
      fontSize: '4rem'
    }
  }),
);

const IconElement: FC<{icon: ReactNode, primary: string, secondary: string}> = ({icon, primary, secondary}) => (
    <Grid container justify="center">
        <Grid item>
        {icon}
        </Grid>
        <Grid item xs={12}>
            <Typography align="center"><Box fontWeight="bold">{primary}</Box></Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography align="center">{secondary}</Typography>
        </Grid>
    </Grid>)

const Home: FC = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([] as Category[]);

    useEffect(() => {
        apiClient.getCategories().then(setCategories);
    }, []);

    return (
        <div>
            <Typography variant="h5" align="center">
                <Box  fontWeight="bold">
                    Ajuda al petit comerç desde la comoditat de la teva casa!
                </Box>
            </Typography>
            <HomeCarousel />

            <Grid container justify="center">
                <Button component={HashLink} to="/#home-more-info" smooth>
                    SABER MÉS
                </Button>
            </Grid>

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" align="center">
                <Box  fontWeight="bold">
                    Les nostres categories
                </Box>
            </Typography>
            <CustomGridList list={categories} />

            <span  id="home-more-info" />
            <Divider style={{ margin: '50px 0' }} />
            
            <Typography  variant="h5" align="center">
                <Box  fontWeight="bold">
                    El comerç local et necessita!
                </Box>
            </Typography>
            <IconElement 
                icon={<BusinessIcon className={classes.largeIcon} />}
                primary="Dificultat per competir" 
                secondary="Les grans superficies i les plataformes online proporcionen una quantitat de serveis difícils d'igualar" />
            <IconElement 
                icon={<LocalHospitalIcon className={classes.largeIcon} />}
                primary="Crisis del confinament" 
                secondary="La situació actual de confinament està provocant un impacte molt negatiu en els petits comerços" />
            <IconElement 
                icon={<LoopIcon className={classes.largeIcon} />}
                primary="Economia sostenible" 
                secondary="Invertir en el comerç local ens beneficia a tots: consumidors, productors locals..." />
                            
            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" align="center">
                <Box  fontWeight="bold">
                    Estalvia temps fent la compra al teu barri amb totes les comoditats
                </Box>
            </Typography>
            <IconElement 
                icon={<CreditCardIcon className={classes.largeIcon} />}
                primary="Pagament online o a la tenda" 
                secondary="Pots escollir el mètode de pagament que més et convingui" />
            <IconElement 
                icon={<LocalShippingIcon className={classes.largeIcon} />}
                primary="T'ho portem a casa (si vols)" 
                secondary="Evita sortir al carrer, nosaltres et duim tot el que necessitis" />
            <IconElement 
                icon={<StoreMallDirectoryIcon className={classes.largeIcon} />}
                primary="Comanda única" 
                secondary="Compra sense preocupar-te de quin comerç té cada producte" />
            <IconElement 
                icon={<LocationOnIcon className={classes.largeIcon} />}
                primary="Seguiment de la comanda" 
                secondary="Coneix l'estat de la compra, evita anar a buscar-la fins que estigui preparada" />
       

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h5" align="center">
                <Box  fontWeight="bold">
                Salvem entre tots el comerç local sense sacrificar l'ús de les darreres tecnologies 
                </Box>
            </Typography>
       
        </div>
        
    );
}

export default Home;