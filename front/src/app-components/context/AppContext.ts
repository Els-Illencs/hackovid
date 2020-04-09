import React from "react";
import { Product } from "../../models/product/Product";

type App = {
    shoppingCart: {
        products: Product[];
        addProduct: (product: Product) => void;
        deleteProduct: (productId: number) => void;
    }
}

export const AppContext = React.createContext<App>({} as any);

