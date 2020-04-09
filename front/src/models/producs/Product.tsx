export interface Product {
    id: number,
    shop_id: number,
    category: string,
    name: string,
    description: string;
    image: string;
    price: number;
    // active: boolean; // TODO ¿¿?? is this actually a boolean?
}