import React, { FC } from "react";
import { GridList, makeStyles, Theme, createStyles, GridListProps } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
  }),
);

const SingleLineGridList: FC<GridListProps> = ({children, ...rest}) => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} {...rest}>
          {children}
        </GridList>
      </div>
    );
  }

export default SingleLineGridList;