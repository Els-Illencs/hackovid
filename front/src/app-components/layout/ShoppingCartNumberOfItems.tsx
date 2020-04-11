import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: "50%",
            borderColor: theme.palette.text.primary,
            borderStyle: "solid",
            borderWidth: 1,
            color: theme.palette.text.primary,
            backgroundColor: common.white,
            width: "18px",
            height: "18px",
            paddingLeft: "4px",
            lineHeight: "17px"

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