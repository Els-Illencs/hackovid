import React, { FC, FormEvent, useState } from "react";
import { Paper, InputBase, IconButton, makeStyles, Theme, createStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from "react-router-dom";

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
    const [redirectToProductPage, setRedirectToProductPage] = useState<{name: string} | null>(null);

    const doRedirectToProductPage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!(e.target instanceof Element)) { 
            return;
        }

        const searchText = e.target.querySelector('input')?.value;
        if (!searchText) {
            return;
        }

        setRedirectToProductPage({
            name: searchText
        });
    };


    return (<>
        {redirectToProductPage && <Redirect push to={`/product-list?name=${redirectToProductPage.name}`} /> }
        <form onSubmit={doRedirectToProductPage}>
            <Paper className={classes.searchBarWrapper}>
                <InputBase
                    className={classes.searchBarInput}
                    placeholder="Què estàs cercant?"
                />
                <IconButton className={classes.searchBarIconButton} type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </form>
    </>);
}

export default SearchBar;