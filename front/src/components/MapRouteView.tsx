import React, { useState } from 'react';
import { MapComponent } from './MapComponent';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Product } from '../models/product/Product';

export interface MapRouteViewProps {
    products: Product[];
    lat: number;
    lng: number;
};

export const MapRouteView: React.FunctionComponent<MapRouteViewProps> = ({ products, lat, lng }) => {

    const defaultTravelMode: string = "WALKING";
    const [travelMode, setTravelMode] = useState(defaultTravelMode);

    const travelModeList: any = {
        "WALKING": "Caminant",
        "BICYCLING": "En bicicleta",
        "DRIVING": "En cotxe"
    };

    let wayPointsShops = {};

    for(let product of products) {
        wayPointsShops[product.shopid] = {latitude: product.shop_lat, longitude: product.shop_lng};
    }

    /*const waypoints: any = [
        {
            latitude: 39.5787897,
            longitude: 2.6483132
        },
        {
            latitude: 39.5794469,
            longitude: 2.6504737
        }
    ];*/

    const waypoints: any = [];

    for (let wayPointsShopItem of Object.values(wayPointsShops)) {
        waypoints.push(wayPointsShopItem);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTravelMode(event.target.value);
    };

    return(
        <Grid container>
            <Grid item xs={12}>
                <div>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="travelMode" name="travelMode" value={travelMode} onChange={handleChange}>
                        <FormControlLabel value="WALKING" control={<Radio />} label={travelModeList["WALKING"]} />
                        <FormControlLabel value="BICYCLING" control={<Radio />} label={travelModeList["BICYCLING"]} />
                        <FormControlLabel value="DRIVING" control={<Radio />} label={travelModeList["DRIVING"]} />
                    </RadioGroup>
                </FormControl>
                </div>
            </Grid>
            <Grid item xs={12}>
                <MapComponent 
                    origin={{
                        latitude: lat,
                        longitude: lng
                    }}
                    destination={{
                        latitude: lat,
                        longitude: lng
                    }}
                    waypoints={waypoints} 
                    travelMode={travelMode}
                />
            </Grid>
        </Grid>
    );
}