import ExternalServices
from '../services/ExternalServices';
import Rating from '@mui/material/Rating';
import RatingsFunctions from '../services/RatingsFunctions';

const RatedFilms = ({ratedFilms, setRatedFilms}) => {

    const ratedFilmsDisplay = ratedFilms.map((film) => 
        <div key = {film.id} className="ratings_card">
            <div className="ratings_poster_image">
                <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
            </div>
            <div className="ratings_card_body">
                <button className="ratings_button" value = {film._id} onClick ={() => RatingsFunctions.deleteFilmFromRatedList(film.id, setRatedFilms)}>Remove from rated films</button>
                <h1>{film.title}</h1>
                <p>Average rating: {film.vote_average}</p>
                <p>{film.overview}</p>
                <Rating className="rating" name="read-only" value={film.rating} readOnly />
            </div>
        </div>
)

    return (
                <div className="ratings_container">{ratedFilmsDisplay}</div>
    )
}

export default RatedFilms