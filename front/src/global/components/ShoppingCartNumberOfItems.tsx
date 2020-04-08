import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: "50%",
            backgroundColor: "red",
            width: "18px",
            height: "18px",
            paddingLeft: "5px",
            lineHeight: "18px"

        },
    }),
);


export interface ShoppingCardNumberOfItemsProps {
    text: number;
}

export const ShoppingCartNumberOfItems: React.FunctionComponent<ShoppingCardNumberOfItemsProps> = ({ text }) => {
    const classes = useStyles();

    return <div className={classes.root} >
        {text}
    </div>
}