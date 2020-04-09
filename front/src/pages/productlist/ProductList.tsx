import React, { FC, useState, useEffect } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";

const apiClient = new ProductApiClient();

const ProductList: FC = () => {
  const [productList, setProducts] = useState([] as Product[]);

  useEffect(() => {
    apiClient.getProducts().then(setProducts);
  }, []);

  return (
    <div>
        {productList.map((product: Product) => (
          <ProductItem product={product}/>
        ))}
    </div>
  );
}

export default ProductList;