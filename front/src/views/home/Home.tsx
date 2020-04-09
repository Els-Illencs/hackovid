import React, { FC, useState, useEffect } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import { HomeCarrousel } from '../../components/HomeCarouselInfo';
import { Category } from '../../models/category/Category';
import { CategoryApiClient } from '../../api/CategoryApiClient';

const apiClient = new CategoryApiClient();

const Home: FC = () => {
    const [categories, setCategories] = useState([] as Category[]);

    useEffect(() => {
        apiClient.getCategories().then(setCategories);
    }, []);

    return (
        <div>
            <h1>Ajuda al petit comerç desde la comoditat de la teva casa!</h1>
            <HomeCarrousel />

            <h2>¿Què estàs buscant?</h2>
            <CustomGridList list={categories} />
        </div>
        
    );
}

export default Home;