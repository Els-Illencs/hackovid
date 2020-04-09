import React, { useState, useEffect } from "react";
import { Product } from "../../models/product/Product";
import { ShoppingCartApiClient } from "../../api/ShoppingCartApiClient";

const apiClient = new ShoppingCartApiClient();

export const ShoppingCart: React.FunctionComponent = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        const getProducts = async () => {
            setProducts(await apiClient.getItems());
        }
        getProducts();
    }, []);

    return (
        <>
            Shopping Cart page
        </>
    );
}