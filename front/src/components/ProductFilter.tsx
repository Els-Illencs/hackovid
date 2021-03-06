import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { ProductFilterFields } from '../models/product/ProductFilterFields';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);

export interface ProductFilterProps {
    productFilterFields: ProductFilterFields,
    onChangeProductFilterFields: (productFilterFields: ProductFilterFields) => void;
    onClickAplyFilter: (productFilterFields: ProductFilterFields) => void;
};

export const ProductFilter: FunctionComponent<ProductFilterProps> = ({ productFilterFields, onChangeProductFilterFields, onClickAplyFilter }) => {
  const classes = useStyles();

  const onChangeProductFilterFieldsAction = (event): void => {
    if(event.target.name == "rating" && productFilterFields.rating == 1 && Number(event.target.value) == 1) {
      productFilterFields[event.target.name] = undefined;
    } else {
      productFilterFields[event.target.name] = event.target.value && event.target.value != "" ? Number(event.target.value) : undefined;
    }
    onChangeProductFilterFields(Object.assign({}, productFilterFields));
  }

  const onClickAplyFilterAction = (event): void => {
    onClickAplyFilter(productFilterFields);
  }

  const onCancel = (): void => {
    onChangeProductFilterFields({} as ProductFilterFields);
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Filtrar</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item md={4} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="minPrice"
                                name="minPrice"
                                label="Preu mínim"
                                type="number"
                                onChange={onChangeProductFilterFieldsAction}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="maxPrice"
                                name="maxPrice"
                                label="Preu màxim"
                                type="number"
                                onChange={onChangeProductFilterFieldsAction}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4} xs={12} justify="center">
                    <Typography component="legend">Valoració
                    </Typography>
                    <Rating
                        name="rating"
                        onChange={(event, newValue) => {
                          onChangeProductFilterFieldsAction(event);
                        }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="distanceSelect">Distància</InputLabel>
                        <Select
                            name="distance"
                            label="Distància"
                            onChange={onChangeProductFilterFieldsAction}
                            inputProps={{
                                id: 'distanceSelect',
                            }}
                        >
                            <MenuItem value="1">1 Km</MenuItem>
                            <MenuItem value="3">3 Km</MenuItem>
                            <MenuItem value="5">5 Km</MenuItem>
                            <MenuItem value="10">10 Km</MenuItem>
                            <MenuItem value="20" selected>20 Km</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={onCancel}>Cancelar</Button>
          <Button size="small" color="primary" onClick={onClickAplyFilterAction}>
            Aplicar
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}