export interface Product {
    id: number,
    name: string,
    image: string,
    shopid: number,
    shopname: string,
    rating: number,
    categoryid: number,
    description: string,
    active: boolean,
    price: number
}

export type ProductShoppingCart = {
    quantity: number;
} & Product;