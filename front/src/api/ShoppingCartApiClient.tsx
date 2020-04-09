import { ProductShoppingCart } from "../models/product/Product";

const SHOPPING_CART_KEY = 'shopping_cart';

export class ShoppingCartApiClient {
  async getItems(): Promise<ProductShoppingCart[]> {
    const res = localStorage.getItem(SHOPPING_CART_KEY);
    if (res === null) {
      return [];
    }

    return JSON.parse(res);
  }

  async saveItems(products: ProductShoppingCart[]): Promise<boolean> {
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(products));

    return true;
  }
}