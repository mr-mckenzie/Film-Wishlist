import * as React from 'react';
import ExternalServices from '../services/ExternalServices';
import InternalServices from '../services/InternalServices';
import RatingComponent from "./Search_RatingComponent"

// this is the main function in this folder
const SearchResults = ({listOfFilmsFromAPI, wishlist, setWishlist, ratedFilms, setRatedFilms}) => {

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
                        <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" className="search_poster_image"/>
                        <div className='search_card_body'>
                        <h1 className='search_card_title'>{film.title}</h1>
                        <h3>({film.release_date.slice(0,4)})</h3>
                        {/* <p>{film.overview}</p> */}
                        <button onClick ={()=>{addToWishlist(film.id)}}>Add to Wishlist</button>
                        <RatingComponent addToRatedFilms = {addToRatedFilms} filmId = {film.id}/>
                        </div>
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

export default SearchResults