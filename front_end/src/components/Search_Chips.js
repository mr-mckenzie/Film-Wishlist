import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ExternalServices from '../services/ExternalServices';

export default function ClickableChips({searchResults, setListOfFilmsFromAPI, actorOrKeyword}) {

    // returning chips with the result of our API search for Actor/Keyword
    const mapSearchResults = (resultsToMap) => {
        let mappedResults = []
        if (resultsToMap && resultsToMap.length > 0) {
            mappedResults = resultsToMap.map( result => {
                return (
                    <button key={result.id} value={result.id} onClick={handleClick}>{result.name}</button>
                )
            })
            }
        return mappedResults
    }


  const handleClick = (event) => {
    //DO API REQUEST HERE;
    // event.target.variant="outlined"

    if (actorOrKeyword == "actor"){
    ExternalServices.getFilmsByActorId(event.target.value)
    .then(results => setListOfFilmsFromAPI(results))
    } else if (actorOrKeyword == "keyword") {
        ExternalServices.getFilmsByKeywordId(event.target.value)
        .then(results => setListOfFilmsFromAPI(results))
    }
  };

  return (
    <div>
        {mapSearchResults(searchResults)}
    </div>
  );
}
