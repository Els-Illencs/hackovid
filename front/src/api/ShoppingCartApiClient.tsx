import { Product } from "../models/product/Product";

const SHOPPING_CART_KEY = 'shopping_cart';

export class ShoppingCartApiClient {
  async getItems(): Promise<Product[]> {
    const res = localStorage.getItem(SHOPPING_CART_KEY);
    if (res === null) {
      return [{
        id: 1,
        name: "Nom producte",
        image: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg",
        shopId: 1,
        categoryId: 1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        active: true,
        price: 10
      },
      {
        id: 1,
        name: "Nom producte 2",
        image: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg",
        shopId: 2,
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        active: true,
        price: 12
      }];
    }

    return JSON.parse(res);
  }

  async saveItem(product: Product): Promise<Product[]> {
    const res = localStorage.getItem(SHOPPING_CART_KEY);

    const products: Product[] = res === null ? [] : JSON.parse(res);
    products.push(product);

    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(products));

    return products;
  }
}