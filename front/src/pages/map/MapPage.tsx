import React from 'react';
import { MapComponent } from '../../components/MapComponent';

export const MapPage: React.FunctionComponent = () => {

    const originPoint: any = {
        latitude: 39.5802543,
        longitude: 2.6495922
    };

    const destinationPoint: any = originPoint;

    const waypoints: any = [
        {
            latitude: 39.5800973,
            longitude: 2.6495213
        },
        {
            latitude: 39.5794469,
            longitude: 2.6504737
        }
    ];

    return(
        <MapComponent origin={originPoint} destination={destinationPoint} waypoints={waypoints}/>
    );
}