import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Category } from '../models/category/Category';

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
      width: 500
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

export default function CustomGridList(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} spacing={4} cols={2}>
        {props.list.map((category: Category) => (
          <GridListTile key={category.id}>
            <img src={category.image} alt={category.name} />
            <GridListTileBar
              title={category.name}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
