import * as React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ExternalServices from '../services/ExternalServices';


export default function Chips({searchResults, setListOfFilmsFromAPI, content}) {

    // returning chips with the result of our API search for Actor/Keyword
    const mapSearchResults = (resultsToMap) => {
        let mappedResults = []
        if (resultsToMap && resultsToMap.length > 0) {
            mappedResults = resultsToMap.map( result => {
                
                return (
                    content==="actor" ? 

                    <Button id={result.id} onClick={handleClick} variant="outlined">
                        <Avatar src={ExternalServices.getFullActorImageURLByPath(result.profile_path)}/>
                        {result.name}
                    </Button> 
                
                :
                
                    <Button id={result.id} onClick={handleClick} variant="outlined">
                    {result.name}
                    </Button> 

                )
            })
            }
        return mappedResults
    }


  const handleClick = (event) => {
    if (content == "actor"){
    ExternalServices.getFilmsByActorId(event.target.id)
    .then(results => setListOfFilmsFromAPI(results))
    } else if (content == "keyword") {
        ExternalServices.getFilmsByKeywordId(event.target.id)
        .then(results => setListOfFilmsFromAPI(results))
    }
  };


  return (
    <Stack className="chip_container" direction={"row"} spacing={1}>
        {mapSearchResults(searchResults)}
    </Stack>
  );
}
