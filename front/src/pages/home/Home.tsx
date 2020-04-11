import React, { FC, useState, useEffect, ReactNode } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import HomeCarousel from './HomeCarousel';
import { Category } from '../../models/category/Category';
import { Package } from '../../models/package/Package';
import { CategoryApiClient } from '../../api/CategoryApiClient';
import { PackageApiClient } from '../../api/PackageApiClient';
import { Typography, Box, makeStyles, createStyles, Theme, Grid, Divider, Button } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LoopIcon from '@material-ui/icons/Loop';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { HashLink } from "react-router-hash-link";
import ContactUsForm from "./ContactUsForm";
import PackageList from "./PackageList";

const categoryApiClient = new CategoryApiClient();
const packageApiClient = new PackageApiClient();

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
            <Typography align="center"><Box component="span" fontWeight="bold">{primary}</Box></Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography align="center">{secondary}</Typography>
        </Grid>
    </Grid>)

const Section: FC<{title: ReactNode}> = ({title, children}) => (<>
    <Typography variant="h6" align="center">
        {/* <Box component="span" fontWeight="bold"> */}
            {title}
        {/* </Box> */}
    </Typography>
    <div style={{ marginTop: 15 }}>
        {children}
    </div>
</>);

const CallToActionButton: FC<{elementToScrollId: string}> = ({elementToScrollId, children}) => (
    <Grid container justify="center" style={{ marginTop: 15 }}>
        <HashLink to={`/home#${elementToScrollId}`} smooth>
            <Button>{children}</Button>
        </HashLink>
    </Grid>
)

const SmallDivider: FC = () => (<Divider style={{ margin: '20px 0' }} />);
const LargeDivider: FC = () => (<Divider style={{ margin: '50px 0' }} />);

const Home: FC = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([] as Category[]);
    const [packages, setPackages] = useState([] as Package[]);

    useEffect(() => {
        categoryApiClient.getCategories().then(setCategories);
        packageApiClient.getPackages().then(setPackages);
    }, []);

    return (
        <div>
            <Section title={<span><b>Comacasa</b>, les coses petites són les més grans.<br />Aquí tens el perquè de confiar als nostres comerços la millor compra:</span>}>
                <HomeCarousel />
                <CallToActionButton elementToScrollId="home-more-info">SABER MÉS</CallToActionButton>
            </Section>

            <SmallDivider />

            <Section title="No perdis ni un minut! Comença la teva compra amb un dels packs disponibles">
                <PackageList packages={packages} />
            </Section>

            <SmallDivider />

            <Section title="Tenim de tot! Has vist quines categories més xules?">
                <CustomGridList list={categories} />
            </Section>

            <span  id="home-more-info" />
            <LargeDivider />

            <Section title="El comerç local et necessita!">
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
            </Section>

            <SmallDivider />

            <Section title="Estalvia temps fent la compra al teu barri amb totes les comoditats">
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
            </Section>

            <LargeDivider />

            <Section title="Tens un comerç? Uneix-te a la nostra xarxa!">
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Augmenta les teves vendes" 
                    secondary="Descripció" />
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Motiu 2" 
                    secondary="Descripció" />
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Motiu 3" 
                    secondary="Descripció" />

                <CallToActionButton elementToScrollId="home-contact-us">CONTACTA AMB NOSALTRES</CallToActionButton>
            </Section>

            <SmallDivider />

            <Section title="Col·labora amb els comerços del teu barri entregant les comandes">
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Escull el que t'interessa" 
                    secondary="Descripció" />
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Motiu 2" 
                    secondary="Descripció" />
                <IconElement 
                    icon={<LocationOnIcon className={classes.largeIcon} />}
                    primary="Motiu 3" 
                    secondary="Descripció" />

                <CallToActionButton elementToScrollId="home-contact-us">CONTACTA AMB NOSALTRES</CallToActionButton>
            </Section>

            <span id="home-contact-us" />
            <LargeDivider />

            <Section title="CONTACTEM!">
                <Typography variant="subtitle1" align="center">
                    No dubtis en contactar amb nosaltres si ens necessites!
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Som aquí, a prop teu. igual que na Maria quan t'atèn a la fruiteria.
                </Typography>
                <ContactUsForm />
            </Section>

            <LargeDivider />

            <Typography variant="subtitle1" align="center">
                Salvar el petit comerç no significa renunciar a la transformació digital.
            </Typography>
            <Typography variant="subtitle1" align="center">
                Salvem entre tots el comerç local amb la tecnologia i <b>Comacasa</b>!
            </Typography>

            <LargeDivider />

            <Typography variant="subtitle1" align="center">
                <b>Comacasa</b>, no s'hi està enlloc
            </Typography>

        </div>
        
    );
}

export default Home;