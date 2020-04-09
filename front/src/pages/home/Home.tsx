import React, { FC, useState, useEffect } from "react";
import { CustomGridList } from '../../components/CustomGridList';
import HomeCarousel from './HomeCarousel';
import { Category } from '../../models/category/Category';
import { CategoryApiClient } from '../../api/CategoryApiClient';
import { Typography, Box } from "@material-ui/core";

const apiClient = new CategoryApiClient();

const Home: FC = () => {
    const [categories, setCategories] = useState([] as Category[]);

    useEffect(() => {
        apiClient.getCategories().then(setCategories);
    }, []);

    return (
        <div>
            <Typography variant="h5" align="center">
                <Box  fontWeight="bold">
                    Ajuda al petit comerç desde la comoditat de la teva casa!
                </Box>
            </Typography>
            <HomeCarousel />

            <h2>Què estàs cercant?</h2>
            <CustomGridList list={categories} />
        </div>
        
    );
}

export default Home;