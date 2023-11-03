import StatisticsFunctions from "../services/StatisticsFunctions"
import RatingsFunctions from "../services/RatingsFunctions"
import ExternalServices from "../services/ExternalServices"
import RatingComponent from "./Search_RatingComponent"
import './Film_Card.css'
import Wishlist_Button from "./Wishlist_Button"

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
            {film.release_date ? <p>({film.release_date.slice(0,4)})</p> : <></>}
            {/* //  AVERAGE RATING */}
            <p>Average rating: {film.vote_average}</p>
            {/* //  WISHLIST INDICATOR === MAKE INTO COMPONENT? */}
            <Wishlist_Button film={film} wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms}></Wishlist_Button>
            {/* //  RATING COMPONENT */}
            <RatingComponent ratedFilms = {ratedFilms} setRatedFilms={setRatedFilms} filmId = {film.id} rating={RatingsFunctions.getRating(film.id, ratedFilms)}/>
            {/* //  AN EXPLICIT REMOVE FROM RATED FILMS button */}
            {(StatisticsFunctions.checkFilmOnList(film.id, ratedFilms)) ? <button className="ratings_button" value={film._id} onClick={() => RatingsFunctions.deleteFilmFromRatedList(film.id, setRatedFilms)}>Remove from rated films</button> : <></>}
            {/* //  FILM OVERVIEW */}
            <p>{film.overview}</p>
        </div>
    </div>
    )
}

export default Film_Card