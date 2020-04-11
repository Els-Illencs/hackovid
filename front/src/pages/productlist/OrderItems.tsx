import React, { FunctionComponent, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import { MenuItem, Container } from "@material-ui/core";

export const OrderItems: FunctionComponent = () => {

  const [redirectToProductPage, setRedirectToProductPage] = useState<string | null>(null);
  const history = useHistory()

  const doRedirectToProductPage = (e) => {
    const regex = /(order=)[^\&]+/;
    
    setRedirectToProductPage(
      regex.test(history.location.search) ? 
        history.location.search.replace(regex, '$1' + e.target.value) :
        `${history.location.search}&order=${e.target.value}`
    );
  }

  return (<>
    {redirectToProductPage && <Redirect push to={`/product-list${redirectToProductPage}`} /> }
    <Container maxWidth="xs">
      <FormControl fullWidth>
        <InputLabel htmlFor="orderSelect">Ordenar</InputLabel>
        <Select
          name="order"
          onChange={doRedirectToProductPage}
          inputProps={{
            id: 'orderSelect',
          }}
        >
          <MenuItem value="relevance">Rellevància</MenuItem>
          <MenuItem value="priceAsc">Preu (de menor a major)</MenuItem>
          <MenuItem value="priceDesc">Preu (de major a menor)</MenuItem>
          <MenuItem value="rating">Valoració</MenuItem>
          <MenuItem value="distance">Distància</MenuItem>
        </Select>
      </FormControl>
    </Container>
  </>);
}