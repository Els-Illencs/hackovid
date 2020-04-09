export interface Product {
    id: number,
    name: string,
    image: string,
    shopId: number,
    shopName: string,
    categoryId: number,
    description: string,
    active: boolean,
    price: number
}

export type ProductShoppingCart = {
    quantity: number;
} & Product;