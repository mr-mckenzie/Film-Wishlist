import * as React from 'react';
import ExternalServices from '../../services/ExternalServices';
import StatisticsFunctions from '../../services/StatisticsFunctions';
import RatingsFunctions from '../../services/RatingsFunctions';
import RatingComponent from "../Search_RatingComponent"

// this is the main function in this folder
const SearchResults = ({listOfFilmsFromAPI, wishlist, setWishlist, ratedFilms, setRatedFilms}) => {

    // returning a grid of film titles and posters
    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
        if (filmsToMap && filmsToMap.length > 0) {
            mappedFilms = filmsToMap.map( film => {
                return (
                    <div className="search_card">
                        <div className="search_poster_image">
                            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
                        </div>
                        <div className='search_card_body'>
                            <h1 className='search_card_title'>{film.title}</h1>
                            <p>({film.release_date.slice(0,4)})</p>
                            {(StatisticsFunctions.checkFilmOnList(film.id, wishlist)) ? <p>It's already on wishlist</p> : <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.addToWishlist(film.id, wishlist, setWishlist) }}>Add to Wishlist</button>}
                            {/* <button className="wishlist_button" onClick ={()=>{addToWishlist(film.id)}}>Add to Wishlist</button> */}
                            <RatingComponent ratedFilms = {ratedFilms} setRatedFilms={setRatedFilms} filmId = {film.id} rating={RatingsFunctions.getRating(film.id, ratedFilms)}/>
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