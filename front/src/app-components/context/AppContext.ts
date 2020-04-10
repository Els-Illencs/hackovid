import React from "react";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";

type App = {
    user: {
        user: User | undefined,
        updateUser: (user: User | undefined) => void; // undefined value in the param to disconnect
    },
    shoppingCart: {
        products: ProductShoppingCart[];
        addProduct: (product: ProductShoppingCart) => void;
        updateProduct: (product: ProductShoppingCart) => void;
        deleteProduct: (productId: number) => void;
    }
}

export const AppContext = React.createContext<App>({} as any);

