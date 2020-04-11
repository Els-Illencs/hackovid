export interface Product {
    id: number,
    name: string,
    image: string,
    shopid: number,
    shopname: string,
    avg_rating: number,
    count_rating: number,
    categoryid: number,
    description: string,
    active: boolean,
    price: number,
    product_type_id: number
}

export type ProductShoppingCart = {
    quantity: number;
} & Product;