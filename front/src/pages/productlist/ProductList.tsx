import React, { FC, useState, useEffect } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { useLocation } from "react-router-dom";

const apiClient = new ProductApiClient();


const ProductList: FC = () => {
  const [productList, setProducts] = useState([] as Product[]);
  const location:any = useLocation();

  const category = location?.state?.category;
  const name = location?.state?.name;

  useEffect(() => {
    if (category) {
      apiClient.getProductsBycategory(category).then(setProducts);;
    } else if (name) {
      apiClient.getProductsByName(name).then(setProducts);
    } else {
      apiClient.getProducts().then(setProducts);
    }
  }, []);

  return (
    <div>
        {productList.map((product: Product) => (
            <ProductItem key={String(product.id)} product={product}/>
        ))}
    </div>
  );
}

export default ProductList;