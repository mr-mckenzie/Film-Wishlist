import StatisticsFunctions from "../services/StatisticsFunctions"
import RatingsFunctions from "../services/RatingsFunctions"
import ExternalServices from "../services/ExternalServices"
import RatingComponent from "./Search_RatingComponent"
import './Film_Card.css'

const Film_Card = ({film, wishlist, setWishlist, ratedFilms, setRatedFilms}) => {

    return(
    <div className="card">
        {/* //  POSTER BACKGROUND */}
        <div className="poster_image">
            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
        </div>
        {/* //  BODY */}
        <div className='card_body'>
            {/* //  TITLE */}
            <h1 className='card_title'>{film.title}</h1>
            {/* //  YEAR */}
            <p>({film.release_date.slice(0,4)})</p>
            {/* //  AVERAGE RATING */}
            <p>Average rating: {film.vote_average}</p>
            {/* //  WISHLIST INDICATOR === MAKE INTO COMPONENT? */}
            {(StatisticsFunctions.checkFilmOnList(film.id, wishlist)) ? 
            <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.deleteFilmFromWishlist(film.id, setWishlist) }}>Remove from Wishlist</button> : 
            <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.addToWishlist(film.id, wishlist, setWishlist) }}>Add to Wishlist</button>}
            {/* //  RATING COMPONENT */}
            <RatingComponent ratedFilms = {ratedFilms} setRatedFilms={setRatedFilms} filmId = {film.id} rating={RatingsFunctions.getRating(film.id, ratedFilms)}/>
            {/* //  AN EXPLICIT REMOVE FROM RATED FILMS button */}
            <button className="ratings_button" value={film._id} onClick={() => RatingsFunctions.deleteFilmFromRatedList(film.id, setRatedFilms)}>Remove from rated films</button>
            {/* //  FILM OVERVIEW */}
            <p>{film.overview}</p>
        </div>
    </div>
    )
}

export default Film_Card