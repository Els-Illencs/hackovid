import React from "react";
import { ProductShoppingCart } from "../../models/product/Product";
import { User } from "../../models/user/User";
import { UserAddress } from "../../models/user/UserAddress";

type App = {
    user: {
        isLoading: boolean,
        user: User | undefined,
        updateUser: (user: User | undefined) => void, // undefined value in the param to disconnect
        userAddress: UserAddress | undefined,
        updateUserAddress: (userAddress: UserAddress | undefined) => void;
    },
    shoppingCart: {
        products: ProductShoppingCart[];
        addProduct: (product: ProductShoppingCart) => void;
        addProducts: (products: ProductShoppingCart[]) => void;
        updateProduct: (product: ProductShoppingCart) => void;
        deleteProduct: (productId: number) => void;
        reset: () => void;
    }
}

export const AppContext = React.createContext<App>({} as any);

