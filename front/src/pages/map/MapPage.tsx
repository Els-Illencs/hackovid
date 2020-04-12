import React, { useState } from 'react';
import { MapComponent } from '../../components/MapComponent';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export const MapPage: React.FunctionComponent = () => {

    const defaultTravelMode: string = "WALKING";
    const [travelMode, setTravelMode] = useState(defaultTravelMode);

    const travelModeList: any = {
        "WALKING": "Caminant",
        "BICYCLING": "En bicilceta",
        "DRIVING": "En cotxe"
    };

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTravelMode(event.target.value);
    };

    return(
        <Grid container>
            <Grid item xs={12}>
                <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Escull el mitja de transport</FormLabel>
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
                    origin={originPoint} 
                    destination={destinationPoint} 
                    waypoints={waypoints} 
                    travelMode={travelMode}
                />
            </Grid>
        </Grid>
    );
}