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

    // to do with on page styling
    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    

    const ratedFilmsDisplay = ratedFilms.map((film) => 
        <div key = {film.id} className="ratings_card">
            <button className="ratings_button" value = {film._id} onClick ={handleClickDeleteRatedFilm}>Remove from rated films</button>
            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" class="ratings_poster_image"/>
            <div className="wishlist_card_body">
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