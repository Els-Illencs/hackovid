import React, { FC, useState, useEffect, ReactNode } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import HomeCarousel from './HomeCarousel';
import { Category } from '../../models/category/Category';
import { CategoryApiClient } from '../../api/CategoryApiClient';
import { Typography, Box, makeStyles, createStyles, Theme, Grid, Divider, Button } from "@material-ui/core";
import { HashLink } from "react-router-hash-link";
import ContactUsForm from "./ContactUsForm";
import PackageList from "./PackageList";

const apiClient = new CategoryApiClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: '5rem'
    },
    iconElement: {
        marginBottom: theme.spacing(2)
    }
  }),
);

const IconElement: FC<{iconSrc: string, primary: string, secondary: string}> = ({iconSrc, primary, secondary}) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.iconElement}>
            <Grid item>
                <img src={iconSrc} className={classes.icon} />
            </Grid>
            <Grid item xs={12}>
                <Typography align="center"><Box component="span" fontWeight="bold">{primary}</Box></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography align="center">{secondary}</Typography>
            </Grid>
        </Grid>
    )
}

const Section: FC<{title: ReactNode}> = ({title, children}) => (<>
    <Typography variant="h6" align="center">
        {title}
    </Typography>
    <div style={{ marginTop: 15 }}>
        {children}
    </div>
</>);

const CallToActionButton: FC<{elementToScrollId: string}> = ({elementToScrollId, children}) => (
    <Grid container justify="center" style={{ marginTop: 15 }}>
        <HashLink to={`/home#${elementToScrollId}`} smooth style={{ textDecoration: 'none' }}>
            <Button>{children}</Button>
        </HashLink>
    </Grid>
)

const SmallDivider: FC = () => (<Divider style={{ margin: '20px 0' }} />);
const LargeDivider: FC = () => (<Divider style={{ margin: '50px 0' }} />);

const Home: FC = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([] as Category[]);

    useEffect(() => {
        apiClient.getCategories().then(setCategories);
    }, []);

    return (
        <div>
            <Section title={<span><b>Comacasa</b>, les coses petites són les més grans.<br />Aquí tens el perquè de confiar als nostres comerços la millor compra:</span>}>
                <HomeCarousel />
                <CallToActionButton elementToScrollId="home-more-info">SABER MÉS</CallToActionButton>
            </Section>

            <SmallDivider />

            <Section title="No perdis ni un minut! Comença la teva compra amb un dels packs disponibles">
                <PackageList packages={[
                    { id: 1, name: 'Els bàsics d\'alimentació', image: 'https://chilmedia.org/v2/media/1660c7a2-d335-44bd-8713-479ccfeea5b9.jpg' },
                    { id: 2, name: 'Pà amb oli', image: 'https://adictaalacarta.com/wp-content/uploads/2018/03/JDLK8031-1100x825.png' },
                    { id: 1, name: 'Fruites i verdures de temporada', image: 'https://cdn.ecotierra.es/tienda/productos-ecologicos/cesta-mixta-12kg/image_1_preview' },

                ]} />
            </Section>

            <SmallDivider />

            <Section title="Tenim de tot! Has vist quines categories més xules?">
                <CustomGridList list={categories} />
            </Section>

            <span  id="home-more-info" />
            <LargeDivider />

            <Section title="Per què et necessita el comerç local?">
                <IconElement 
                    iconSrc="/icons/buildings.png"
                    primary="Acabar amb la dificultat per competir" 
                    secondary="Les grans plataformes proporcionen una enorme quantitat de serveis. Però no juguen amb la qualitat local! Recolzem les petites botiques perquè, com tu, creiem amb elles." />
                <IconElement 
                    iconSrc="/icons/earth-mask.png"
                    primary="Acabar amb la crisis del confinament" 
                    secondary="La situació actual de confinament provoca un impacte de difícil reparació. Si no tens presència a internet i et mous a domicili, no existeixes. Anem a fer que existeixin!" />
                <IconElement 
                    iconSrc="/icons/pig.png"
                    primary="Economia sostenible" 
                    secondary="No oblidem que invertir en comerç local ens beneficia a tots: consumidors, productors locals... Si els ajudem a ells, ens ajudem a nosaltres mateixos!" />
            </Section>

            <SmallDivider />

            <Section title="Estalvia temps fent la compra al teu barri amb totes les comoditats">
                <IconElement 
                    iconSrc="/icons/hand-money.png"
                    primary="Pagament en línia o a la tenda" 
                    secondary="Pots escollir el mètode de pagament que més tꞌagradi. Tot i que, a dia dꞌavui, et recomanem el pagament segur en línea." />
                <IconElement 
                    iconSrc="/icons/box.png"
                    primary="Opció a domicili, t'ho portem a casa!" 
                    secondary="No caldrà ni que surtis al carrer. Nosaltres anirem a les botigues i tꞌacostarem tot allò que necessitis." />
                <IconElement 
                    iconSrc="/icons/basket-3.png"
                    primary="Comanda única" 
                    secondary="Compra sense preocupar-te de quin comerç té el producte. Unificam , al nostre sistema, els productes sense discriminació. Pots fer una sola compra a diverses botigues!" />
                <IconElement 
                    iconSrc="/icons/search.png"
                    primary="Seguiment de la comanda" 
                    secondary="Coneix lꞌestat de la teva compra! Si vas a buscar-la, evita fer-ho fins que estigui preparada; si te la duim, assabenta't de per ón anem amb el servei intel·ligent de tracking." />
            </Section>

            <LargeDivider />

            <Section title="Tens un comerç? No ho dubtis, uneix-te a la nostra xarxa!">
                <IconElement 
                    iconSrc="/icons/arrow.png"
                    primary="Augmenta les teves vendes" 
                    secondary="La ciutadania opta pel format digital. Per què privar-la del producte de la terra? Ven també mitjançant Comacasa!" />
                <IconElement 
                    iconSrc="/icons/people-network.png"
                    primary="Amplia la teva xarxa logística" 
                    secondary="No et preocupis! Si no tens capacitat de distribució, desde Comacasa ho farem per tu." />
                <IconElement 
                    iconSrc="/icons/sunglasses.png"
                    primary="Guanya visibilitat" 
                    secondary="Aprofita't de les nostres accions a les xarxes socials! Donarem visibilitat al teu comerç i els teus productes." />

                <CallToActionButton elementToScrollId="home-contact-us">CONTACTA AMB NOSALTRES</CallToActionButton>
            </Section>

            <SmallDivider />

            <Section title="Tꞌagrada moure't? Col·labora amb els comerços i la gent del teu barri entregant les comandes!">
                <IconElement 
                    iconSrc="/icons/arrow-multiple.png"
                    primary="Escull el que t'interessi" 
                    secondary="Posem a la teva disposició un sistema de preus fixos, a més de propines a triar per tu mateix." />
                <IconElement 
                    iconSrc="/icons/woman-old.png"
                    primary="Ajuda qui no pot anar a comprar" 
                    secondary="Per gent gran i amb discapacitat, anar a una botiga pot significar esport de risc. Ajudal's a ells com ells tꞌajudaríen!" />
                <IconElement 
                    iconSrc="/icons/man-happy.png"
                    primary="Treballa al temps que fas xarxa" 
                    secondary="Treballa amb la satisfacció dꞌestar connectant a la gent!" />

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