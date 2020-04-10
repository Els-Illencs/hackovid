import React, { FC, FormEvent } from "react";
import { Paper, InputBase, IconButton, makeStyles, Theme, createStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchBarWrapper: {
            display: 'flex',
            alignItems: 'center',
            margin: '0 24px 10px 24px'
        },
        searchBarInput: {
            flex: 1,
            margin: '0 10px',
        },
        searchBarIconButton: {
            padding: '0 10px',
        },
    }),
);


const SearchBar: FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const redirectToProductPage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!(e.target instanceof Element)) { 
            return;
        }

        history.push({
            pathname: '/product-list',
            state: { 
                name: e.target.querySelector('input')?.value 
            }
        });

        history.go(0);
    };


    return (
        <form onSubmit={redirectToProductPage}>
            <Paper className={classes.searchBarWrapper}>
                <InputBase
                    className={classes.searchBarInput}
                    placeholder="Què estàs cercant?"
                />
                <IconButton className={classes.searchBarIconButton} type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </form>);
}

export default SearchBar;