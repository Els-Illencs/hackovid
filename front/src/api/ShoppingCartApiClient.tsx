import { Product } from "../models/product/Product";

const SHOPPING_CART_KEY = 'shopping_cart';

export class ShoppingCartApiClient {
  async getItems(): Promise<Product[]> {
    const res = localStorage.getItem(SHOPPING_CART_KEY);
    if (res === null) {
      return [];
    }

    return JSON.parse(res);
  }

  async saveItems(products: Product[]): Promise<boolean> {
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(products));

    return true;
  }
}