import React from "react";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";

type App = {
    user: User,
    shoppingCart: {
        products: ProductShoppingCart[];
        addProduct: (product: ProductShoppingCart) => void;
        updateProduct: (product: ProductShoppingCart) => void;
        deleteProduct: (productId: number) => void;
    }
}

export const AppContext = React.createContext<App>({} as any);

