import React, { FC, useEffect, useState, useContext } from "react";
import useQuery from "../../hooks/useQuery";
import { Package } from "../../models/package/Package";
import { ProductShoppingCart } from "../../models/product/Product";
import { Typography, Button, makeStyles, Grid, createStyles } from "@material-ui/core";
import { ProductPackageItem } from "./ProductPackageItem";
import { AppContext } from "../../app-components";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { PackageApiClient } from '../../api/PackageApiClient';
import { useHistory } from "react-router-dom";

const packageApiClient = new PackageApiClient();

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            width: "100%"
        },
        changeAddress: {
            marginBottom: "1em"
        },
        link: {
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: "bold"
        }
    }),
);

const PackageDetail: FC = () => {
    const { shoppingCart, user: { isLoading: isLoadingUserData, user, userAddress, updateUserAddress } } = useContext(AppContext);
    const query = useQuery();
    const classes = useStyles();
    const history = useHistory();
    const [prodPackage, setProdPackage] = useState<Package | null>(null);
    const [products, setProducts] = useState<ProductShoppingCart[] | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const packageAsStr = query.get('packageId');
    const packageId = packageAsStr ? parseInt(packageAsStr, 10) : null;
    const packageName = query.get('packageName');

    useEffect(() => {
        if (!isLoadingUserData) {
            setOpenDialog(user === undefined && userAddress !== undefined && userAddress.address === '');
        }
    }, [isLoadingUserData, user, userAddress]);

    useEffect(() => {
        const isUserAddressMissing = user === undefined && userAddress !== undefined && userAddress.address === '';
        if (openDialog || isLoadingUserData || isUserAddressMissing) {
            return;
        }

        if (packageId && packageName) {
            setProdPackage({
                id: packageId,
                name: packageName,
                image: ''
            });
            const address = userAddress && userAddress.address !== "" ? userAddress : user?.address;
            packageApiClient.getPackageItem(packageId, address).then(setProducts);
        }

    }, [packageId, packageName, isLoadingUserData, user, userAddress]);

    const onClickChangeAddress = (): void => {
        setOpenDialog(true);
        setProducts([]);
    }

    const changeQuantity = (newQuantity: number, originalProduct: ProductShoppingCart, productIndex: number) => {
        const newProducts = products!.map((p, i) =>
            i !== productIndex ? p : { ...originalProduct, quantity: newQuantity });

        setProducts(newProducts);
    }

    const deleteProduct = (productIndex: number) => {
        const newProducts = products!.filter((p, i) => i !== productIndex);

        setProducts(newProducts);
    }

    const addProductsToShoppingCart = () => {
        shoppingCart.addProducts(products!);
        history.push('/shopping-cart');
    }

    if (openDialog) {
        return (<AddressRequestDialog open={openDialog} onClose={() => setOpenDialog(false)} onSelectAddress={updateUserAddress} />);
    }

    if (!prodPackage || !products) {
        return (<></>);
    }

    const address = userAddress && userAddress.address !== "" ? userAddress : user?.address;
    return (<>
        <Typography variant="h4" align="center">{prodPackage.name}</Typography>

        <Typography align="center">
            Aquest pack ha estat generat especialment per a tu, escollint els productes de les tendes del teu voltant.
        </Typography>
        <Typography align="center">
            ¡No t'oblidis revisar els productes inclosos i les quantitats abans d'afegir el pack a la teva cistella!
        </Typography>

        <Button
            className={classes.button}
            size="large"
            disabled={products.length === 0}
            style={{ margin: '15px 0' }}
            onClick={addProductsToShoppingCart}>AFEGEIX PRODUCTES A LA CISTELLA</Button>

        {address ?
            <Grid
              container
              spacing={0}
              direction="column"
            >
              <Typography className={classes.changeAddress}>
                Mostrant productes prop de {address.address}.&nbsp;
                <span 
                  onClick={onClickChangeAddress}
                  className={classes.link}
                >
                  Vols canviar-la?
                </span>
              </Typography>
            </Grid> :
            <></>
        }
        {
        products.length ? 
            products.map((p, i) =>
                <ProductPackageItem
                    product={p}
                    onChangeQuantity={(q, p) => changeQuantity(q, p, i)}
                    onDeleteProduct={() => deleteProduct(i)}
                    key={p.id} />
            ) :
            !openDialog ? "No s'han trobat productes d'aquest paquet prop de la teva ubicació" : ""
        }
    </>);
}

export default PackageDetail;