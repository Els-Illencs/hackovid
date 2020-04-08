import React, { FC, useState, useEffect } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import { Category } from '../../models/category/Category';
import { CategoryApiClient } from '../../api/CategoryApiClient';

const apiClient = new CategoryApiClient();

const Categories: FC = () => {
  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    apiClient.getCategories().then(setCategories);
  }, []);

  return (
    <CustomGridList list={categories} />
  );
}

export default Categories;