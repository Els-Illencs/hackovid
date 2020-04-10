import React, { FC, FormEvent, useState } from "react";
import { Paper, InputBase, IconButton, makeStyles, Theme, createStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'

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
    const [redirectToProductPage, setRedirectToProductPage] = useState<string | null>(null);
    const history = useHistory()

    const doRedirectToProductPage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!(e.target instanceof Element)) { 
            return;
        }

        const searchText = e.target.querySelector('input')?.value;
        if (!searchText) {
            return;
        }

        const regex = /(name=)[^\&]+/;
        const operator = history.location.search.indexOf("?") > -1 ? "&": "?"
        setRedirectToProductPage(
            regex.test(history.location.search) ? 
                history.location.search.replace(regex, '$1' + searchText) :
                `${history.location.search}${operator}name=${searchText}`
        );
    };


    return (<>
        {redirectToProductPage && <Redirect push to={`/product-list${redirectToProductPage}`} /> }
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