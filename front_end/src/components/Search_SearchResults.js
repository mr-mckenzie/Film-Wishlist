import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ExternalServices from '../services/ExternalServices';

// to do with on page styling
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// this is the main function in this folder
const AutoGrid = ({listOfFilmsFromAPI, setSelectedFilm, wishlist, setWishlist}) => {

    // attempting to add films to a wishlist
    const addToWishlist = (filmIdToAddToWishlist) => {
      const wishlistFilm = ExternalServices.getFilmById(filmIdToAddToWishlist)
      
      wishlistFilm.then(filmObject => setSelectedFilm(filmObject))
      
      wishlistFilm.then(filmObject => setWishlist([...wishlist, filmObject]))
    }

    // returning a grid of film titles and posters
    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
        if (filmsToMap && filmsToMap.length > 0) {
            mappedFilms = filmsToMap.map( film => {
                return (         
                    <Grid>
                        <Item>{film.title} 
                        <br></br>
                        <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" /> </Item>
                        <button onClick ={()=>{addToWishlist(film.id)}}>Add to Wishlist</button>
                      </Grid>
                )
            })
          }
        return mappedFilms
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {mapFilms(listOfFilmsFromAPI)}
        </Grid>
      </Box>
    );
}

export default AutoGrid