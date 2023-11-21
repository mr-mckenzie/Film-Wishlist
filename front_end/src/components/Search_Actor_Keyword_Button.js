import * as React from 'react';
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

                    <Button id={result.id} onClick={handleClick} variant="outlined" className='actor_button' fullWidth="true" size='small' sx={{display: "flex", flexWrap: "nowrap", flexDirection:"row", minWidth:"10rem", maxWidth:"20rem"}}>
                        <Avatar src={ExternalServices.getFullActorImageURLByPath(result.profile_path)}/>
                        <p sx={{width:"5rem"}}>{result.name}</p>
                    </Button> 
                
                :
                
                    <Button id={result.id} onClick={handleClick} variant="outlined" className='keyword_button'fullWidth="true" size='small'>
                        <p>{result.name}</p>
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
    <Stack className="button_container" direction={"row"} spacing={1}>
        {mapSearchResults(searchResults)}
    </Stack>
  );
}
