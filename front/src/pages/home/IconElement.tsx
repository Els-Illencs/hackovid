import React, { FC } from "react";
import { Grid, Typography, Box, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: '4rem'
    },
    iconElement: {
        marginBottom: theme.spacing(2)
    }
  }),
);

const IconElement: FC<{iconSrc: string, headline?: string, text: string}> = ({iconSrc, headline, text}) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.iconElement}>
            <Grid item>
                <img src={iconSrc} className={classes.icon} />
            </Grid>
            {headline && <Grid item xs={12}>
                <Typography align="center"><Box component="span" fontWeight="bold">{headline}</Box></Typography>
            </Grid>}
            <Grid item xs={12}>
                <Typography align="center">{text}</Typography>
            </Grid>
        </Grid>
    )
}

export default IconElement;