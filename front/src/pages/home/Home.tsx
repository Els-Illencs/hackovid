import React, { FC, useState, useEffect, ReactNode } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import HomeCarousel from './HomeCarousel';
import { Category } from '../../models/category/Category';
import { Package } from '../../models/package/Package';
import { CategoryApiClient } from '../../api/CategoryApiClient';
import { PackageApiClient } from '../../api/PackageApiClient';
import { Typography, Grid, GridProps, Divider, Button } from "@material-ui/core";
import { HashLink } from "react-router-hash-link";
import ContactUsForm from "./ContactUsForm";
import IconElement from "./IconElement";
import PackageList from "./PackageList";

const categoryApiClient = new CategoryApiClient();
const packageApiClient = new PackageApiClient();

const Section: FC<{title: ReactNode}> = ({title, children}) => (<>
    <Typography variant="h6" align="center">
        {title}
    </Typography>
    <div style={{ marginTop: 15 }}>
        {children}
    </div>
</>);

const IconElementGroup: FC = ({children}) => {
    if (!Array.isArray(children)) {
        throw new Error("Bad use of 'IconElementGroup'!");
    }

    const sm = Math.floor(12 / children.length) as GridProps["sm"];

    return (
        <Grid container>
            {Array.isArray(children) && children.map(c => 
                <Grid item container justify="center" xs={12} sm={sm}>
                    <div style={{ maxWidth: 360 }} >
                        {c}
                    </div>
                </Grid>
            )}
        </Grid>
    )
}

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
    const [categories, setCategories] = useState([] as Category[]);
    const [packages, setPackages] = useState([] as Package[]);

    useEffect(() => {
        categoryApiClient.getCategories().then(setCategories);
        packageApiClient.getPackages().then(setPackages);
    }, []);

    return (
        <div>
            <Section title={<span><b>Comacasa</b>, les coses petites són les més grans; aquí el perquè de confiar-nos la millor compra:</span>}>
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

            <Section title="Per què et necessita el comerç local?">
                <IconElementGroup>
                    <IconElement
                        iconSrc="/icons/buildings.png"
                        headline="Acabar amb la dificultat per competir" 
                        text="Les grans plataformes proporcionen una enorme quantitat de serveis. Però no juguen amb la qualitat local! Recolzem les petites botiques perquè, com tu, creiem amb elles." />
                    <IconElement 
                        iconSrc="/icons/earth-mask.png"
                        headline="Acabar amb la crisis del confinament" 
                        text="La situació actual de confinament provoca un impacte de difícil reparació. Si no tens presència a internet i et mous a domicili, no existeixes. Anem a fer que existeixin!" />
                    <IconElement 
                        iconSrc="/icons/pig.png"
                        headline="Economia sostenible" 
                        text="No oblidem que invertir en comerç local ens beneficia a tots: consumidors, productors locals... Si els ajudem a ells, ens ajudem a nosaltres mateixos!" />
                </IconElementGroup>
            </Section>

            <SmallDivider />

            <Section title="Estalvia temps fent la compra al teu barri amb totes les comoditats">
                <IconElementGroup>
                    <IconElement 
                        iconSrc="/icons/hand-money.png"
                        headline="Pagament en línia o a la tenda" 
                        text="Pots escollir el mètode de pagament que més tꞌagradi. Tot i que, a dia dꞌavui, et recomanem el pagament segur en línea." />
                    <IconElement 
                        iconSrc="/icons/box.png"
                        headline="Opció a domicili, t'ho portem a casa!" 
                        text="No caldrà ni que surtis al carrer. Nosaltres anirem a les botigues i tꞌacostarem tot allò que necessitis." />
                    <IconElement 
                        iconSrc="/icons/basket-3.png"
                        headline="Comanda única" 
                        text="Compra sense preocupar-te de quin comerç té el producte. Unificam , al nostre sistema, els productes sense discriminació. Pots fer una sola compra a diverses botigues!" />
                    <IconElement 
                        iconSrc="/icons/search.png"
                        headline="Seguiment de la comanda" 
                        text="Coneix lꞌestat de la teva compra! Si vas a buscar-la, evita fer-ho fins que estigui preparada; si te la duim, assabenta't de per on anem amb el servei intel·ligent de tracking." />
                </IconElementGroup>
            </Section>

            <LargeDivider />

            <Section title="Tens un comerç? No ho dubtis, uneix-te a la nostra xarxa!">
                <IconElementGroup>
                    <IconElement 
                        iconSrc="/icons/arrow.png"
                        headline="Augmenta les teves vendes" 
                        text="La ciutadania opta pel format digital. Per què privar-la del producte de la terra? Ven també mitjançant Comacasa!" />
                    <IconElement 
                        iconSrc="/icons/people-network.png"
                        headline="Amplia la teva xarxa logística" 
                        text="No et preocupis! Si no tens capacitat de distribució, desde Comacasa ho farem per tu." />
                    <IconElement 
                        iconSrc="/icons/sunglasses.png"
                        headline="Guanya visibilitat" 
                        text="Aprofita't de les nostres accions a les xarxes socials! Donarem visibilitat al teu comerç i els teus productes." />
                </IconElementGroup>
                <CallToActionButton elementToScrollId="home-contact-us">CONTACTA AMB NOSALTRES</CallToActionButton>
            </Section>

            <SmallDivider />

            <Section title="Tꞌagrada moure't? Col·labora amb els comerços i la gent del teu barri entregant les comandes!">
                <IconElementGroup>
                    <IconElement 
                        iconSrc="/icons/arrow-multiple.png"
                        headline="Escull el que t'interessi" 
                        text="Posem a la teva disposició un sistema de preus fixos, a més de propines a triar per tu mateix." />
                    <IconElement 
                        iconSrc="/icons/woman-old.png"
                        headline="Ajuda qui no pot anar a comprar" 
                        text="Per gent gran i amb discapacitat, anar a una botiga pot significar esport de risc. Ajuda'ls a ells com ells tꞌajudarien!" />
                    <IconElement 
                        iconSrc="/icons/man-happy.png"
                        headline="Treballa al temps que fas xarxa" 
                        text="Treballa amb la satisfacció dꞌestar connectant a la gent!" />
                </IconElementGroup>
                <CallToActionButton elementToScrollId="home-contact-us">CONTACTA AMB NOSALTRES</CallToActionButton>
            </Section>

            <span id="home-contact-us" />
            <LargeDivider />

            <Section title="CONTACTEM!">
                <Typography variant="subtitle1" align="center">
                    No dubtis en contactar amb nosaltres si ens necessites!
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Som aquí, a prop teu. Igual que na Maria quan t'atèn a la fruiteria.
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