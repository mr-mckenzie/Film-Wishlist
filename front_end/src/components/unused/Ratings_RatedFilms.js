import ExternalServices
from '../../services/ExternalServices';
import RatingsFunctions from '../../services/RatingsFunctions';
import RatingComponent from '../Search_RatingComponent';

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
                <RatingComponent className="rating" filmId={film.id} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} rating={film.rating}/>
            </div>
        </div>
)

    return (
                <div className="ratings_container">{ratedFilmsDisplay}</div>
    )
}

export default RatedFilms