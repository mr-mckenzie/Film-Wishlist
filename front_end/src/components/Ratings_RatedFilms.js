import ExternalServices
from '../services/ExternalServices';
import InternalServices from '../services/InternalServices';
import Rating from '@mui/material/Rating';


const RatedFilms = ({ratedFilms, setRatedFilms}) => {

    // delete film from ratedFilms
    const deleteFilmFromRatedFilms = (id) => {
        InternalServices.deleteRatedFilm(id)
        .then(() => InternalServices.getRatedFilms()
        .then((updatedRatedFilms) => {setRatedFilms(updatedRatedFilms)})
        )
    }
    

    const handleClickDeleteRatedFilm = (event) => {
        console.log(event.target.value)
        deleteFilmFromRatedFilms(event.target.value)
    }

    const ratedFilmsDisplay = ratedFilms.map((film) => 
        <div key = {film.id} className="ratings_card">
            <div class="ratings_poster_image">
                <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
            </div>
            <div className="ratings_card_body">
                <button className="ratings_button" value = {film._id} onClick ={handleClickDeleteRatedFilm}>Remove from rated films</button>
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