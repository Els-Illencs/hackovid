import React, { FC, useEffect, useState, useContext } from "react";
import useQuery from "../../hooks/useQuery";
import { Package } from "../../models/package/Package";
import { ProductShoppingCart } from "../../models/product/Product";
import { Typography, Button, makeStyles, createStyles } from "@material-ui/core";
import { ProductPackageItem } from "./ProductPackageItem";
import { AppContext } from "../../app-components";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            width: "100%"
        },
    }),
);

const PackageDetail: FC = () => {
    const { shoppingCart, user: { isLoading: isLoadingUserData, user, userAddress, updateUserAddress } } = useContext(AppContext);
    const query = useQuery();
    const classes = useStyles();
    const [prodPackage, setProdPackage] = useState<Package | null>(null);
    const [products, setProducts] = useState<ProductShoppingCart[] | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const packageId = query.get('packageId');

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

        setProdPackage({
            id: 1,
            name: 'Fruites i verdures de temporada',
            image: ''
        });
        const products = [
            {"id":10,"name":"Tarònja de Soller","image":"https://cdn.pixabay.com/photo/2017/02/26/12/27/oranges-2100108_960_720.jpg","description":"Tarònges de Soller al pes. ¡Que en son de bones!","price":2.99,"active":true,"categoryid":1,"shopid":2,"shopname":"El rei de la fruita","avg_rating":0, "count_rating":0, "product_type_id": 1},
            {"id":8,"name":"Plàtan de Canàries","image":"https://cdn.pixabay.com/photo/2018/09/24/20/12/bananas-3700718_960_720.jpg","description":"Plàtans de canàries al pes","price":2.89,"active":true,"categoryid":1,"shopid":2,"shopname":"El rei de la fruita","avg_rating":0, "count_rating":0, "product_type_id": 1},
            {"id":4,"name":"Pera Rocha","image":"https://cdn.pixabay.com/photo/2016/07/22/09/59/fruit-1534494_960_720.jpg","description":"Peres del tipus Rocha al pes","price":1.89,"active":true,"categoryid":1,"shopid":2,"shopname":"El rei de la fruita","avg_rating":0, "count_rating":0, "product_type_id": 1},
            {"id":12,"name":"Síndria de Mallorca","image":"https://p0.piqsels.com/preview/393/901/113/watermelon-slice-isolated-white-thumbnail.jpg","description":"Síndries de Km0 cultivada a Mallorca","price":4.89,"active":true,"categoryid":1,"shopid":2,"shopname":"El rei de la fruita","avg_rating":0, "count_rating":0, "product_type_id": 1}
        ];

        setProducts(products.map(p => ({ quantity: 1, ...p })));
    }, [packageId, isLoadingUserData, user, userAddress]);

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
    }

    if (openDialog) {
        return (<AddressRequestDialog open={openDialog} onClose={() => setOpenDialog(false)} onSelectAddress={updateUserAddress} />);
    }

    if (!prodPackage || !products) {
        return (<></>);
    }

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
            variant="contained"
            size="large"
            color="secondary"
            disabled={products.length === 0}
            style={{ margin: '15px 0' }}
            onClick={addProductsToShoppingCart}>AFEGEIX PRODUCTES A LA CISTELLA</Button>

        {products.map((p, i) =>
            <ProductPackageItem
                product={p}
                onChangeQuantity={(q, p) => changeQuantity(q, p, i)}
                onDeleteProduct={() => deleteProduct(i)}
                key={p.id} />
        )}
    </>);
}

export default PackageDetail;