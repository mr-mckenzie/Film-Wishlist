import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ExternalServices from '../services/ExternalServices';
import InternalServices from '../services/InternalServices';
import RatingComponent from "./Search_RatingComponent"



// to do with on page styling
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// this is the main function in this folder
const AutoGrid = ({listOfFilmsFromAPI, wishlist, setWishlist, ratedFilms, setRatedFilms}) => {

    // adding the rating key value pair to api output
    //ALSO deletes crew from object
    const addRatingKeyValuePairAndDeleteCrew = (filmWithAddedRating, rating = null) => {
        filmWithAddedRating["rating"] = rating
        delete filmWithAddedRating["credits"]["crew"]
        return filmWithAddedRating
    }
    
    // add film to a wishlist
    const addToWishlist = (filmIdToAddToWishlist, rating = null) => {
        ExternalServices.getFilmById(filmIdToAddToWishlist)
        .then(wishlistFilm => { 
            const wishlistFilmWithRating = addRatingKeyValuePairAndDeleteCrew(wishlistFilm, rating)
            InternalServices.postFilmToDatabase(wishlistFilmWithRating)
            setWishlist([...wishlist, wishlistFilmWithRating])
        })
    }

    // add film to a rated films list
    const addToRatedFilms = (filmIdToAddToRatedFilms, rating) => {
        ExternalServices.getFilmById(filmIdToAddToRatedFilms)
        .then(ratedFilm => { 
            const ratedFilmWithRating = addRatingKeyValuePairAndDeleteCrew(ratedFilm, rating)
            InternalServices.postFilmToDatabase(ratedFilmWithRating)
            setRatedFilms([...ratedFilms, ratedFilmWithRating])
        })
    }

    // returning a grid of film titles and posters
    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
        if (filmsToMap && filmsToMap.length > 0) {
            mappedFilms = filmsToMap.map( film => {
                return (
                    <div className="search_card">
                        <p>{film.title}</p>
                        <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" className='search_poster_image'/>
                        <button onClick ={()=>{addToWishlist(film.id)}}>Add to Wishlist</button>
                        <RatingComponent addToRatedFilms = {addToRatedFilms} filmId = {film.id}/>
                    </div>
                )
            })
        }
        return mappedFilms
    }

    return (
        <div className="search_container">
            {mapFilms(listOfFilmsFromAPI)}
        </div>
    );
}

export default AutoGrid