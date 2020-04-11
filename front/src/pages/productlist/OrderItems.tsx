import React, { FunctionComponent, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";

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
    <div>
      <FormControl>
        <InputLabel htmlFor="orderSelect">Ordenar</InputLabel>
        <Select
          native
          name="order"
          onChange={doRedirectToProductPage}
          inputProps={{
            id: 'orderSelect',
          }}
        >
          <option value="relevance">Rellevància</option>
          <option value="priceAsc">Preu (de menor a major)</option>
          <option value="priceDesc">Preu (de major a menor)</option>
          <option value="rating">Valoració</option>
          <option value="distance">Distància</option>
        </Select>
      </FormControl>
    </div>
  </>);
}