import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import ExternalServices
from '../services/ExternalServices';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InternalServices from '../services/InternalServices';

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
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const ratedFilmsDisplay = ratedFilms.map((film) => 
    <div key = {film.id} class="ratings_films">
        <ul class="ratings_carousel">
        <Grid>
            <Item>
                <li class = "ratings_card">
                    <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" class="ratings_poster_image"/>
                    <h1>{film.title}</h1>
                    <p>Average rating: {film.vote_average}</p>
                    <p>{film.overview}</p>
                    <button value = {film._id} onClick ={handleClickDeleteRatedFilm}>Remove from rated films</button>
                </li>
            </Item>
        </Grid>
        </ul>
    </div>
)

    return (
        // <Box sx={{flexGrow:1}}>
        //     <Grid container spacing={3}>
        <div>
                <ul>{ratedFilmsDisplay}</ul>
        </div> 
            // </Grid> 
        // </Box>
    )
}

export default RatedFilms