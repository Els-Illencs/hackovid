import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Category } from '../models/category/Category';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: "100%"
    },
    title: {
      fontWeight: "bold"
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    image : {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  }),
);

export interface CustomGridListProps {
  list: Category[]
};

export const CustomGridList: React.FunctionComponent<CustomGridListProps> = ({ list }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} spacing={4} cols={2}>
        {list.map((category: Category) => (
            <GridListTile key={category.id}>
              <Link to={`/product-list?category=${category.id}`}>
                <img className={classes.image} src={category.image} alt={category.name} />
                <GridListTileBar
                  className={classes.title}
                  title={category.name}
                />
              </Link>
            </GridListTile>
        ))}
      </GridList>
    </div>
  );
}