import { Product } from "../models/product/Product";
import { ProductApiClient } from "./ProductApiClient";

const SHOPPING_CART_KEY = 'shopping_cart';

export class ShoppingCartApiClient {
  async getItems(): Promise<Product[]> {
    const res = localStorage.getItem(SHOPPING_CART_KEY);
    if (res === null) {
      // return []
      // TODO fake data
      console.log(await new ProductApiClient().getProducts());
      return await new ProductApiClient().getProducts();
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