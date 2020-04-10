import React, { FC, useState, useEffect } from "react";
import { ProductApiClient } from '../../api/ProductApiClient';
import { Product } from "../../models/product/Product";
import { ProductItem } from "./ProductItem";
import { useLocation } from "react-router-dom";
import { AddressRequestDialog } from "../../components/AddressRequestDialog";
import { UserApiClient } from "../../api/UserApiClient";
import { UserAddress } from "../../models/user/UserAddress";

const apiClient = new ProductApiClient();
const userApiClient= new UserApiClient();

const ProductList: FC = () => {
  const [productList, setProducts] = useState([] as Product[]);
  const [isAddressStoredInLocalStorage, setIsAddressStoredInLocalStorage] = useState(false as boolean);
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
    checkIsAddressStoredInLocalStorage();
  }, []);

  const checkIsAddressStoredInLocalStorage = (): void => {
    userApiClient.getStoredUserAddress().then(userAddress => {
      const value = userAddress.address != "";
      setIsAddressStoredInLocalStorage(value);
    })
  }

  return (
    <div>
        {productList.map((product: Product) => (
            <ProductItem key={String(product.id)} product={product}/>
        ))}
        <AddressRequestDialog view={!isAddressStoredInLocalStorage}/>
    </div>
  );
}

export default ProductList;