import React, { FC } from "react";
import SingleLineGridList from "../../components/SingleLineGridList";
import { GridListTile, makeStyles, Theme, createStyles, GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Package } from "../../models/package/Package";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type PackageListProps = {
    packages: Package[]
}

const PackageList: FC<PackageListProps> = ({packages}) => {
    const classes = useStyles();

    return (
        <SingleLineGridList cellHeight={180} spacing={4} cols={4} style={{ maxWidth: '100%' }}>
            {packages.map(p =>
                <GridListTile style={{ minWidth: 200, maxWidth: 270 }}>
                  <Link to={`/package-detail?packageId=${p.id}&packageName=${p.name}`}>
                      <img className={classes.image} src={p.image} alt={p.name} />
                      <GridListTileBar
                      className={classes.title}
                      title={p.name} />
                  </Link>
                </GridListTile>
            )}
        </SingleLineGridList>
    )
}

export default PackageList;