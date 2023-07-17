import ExternalServices from "../services/ExternalServices";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InternalServices from "../services/InternalServices";



const WishlistIndividualFilm = ({wishlist, setWishlist}) => {

    

    // to do with on page styling
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // delete film from wishlist
    const deleteFilmFromWishlist = (id) => {
        InternalServices.deleteWishlistFilmByID(id)
        .then(() => InternalServices.getWishlistFilms()
        .then((updatedWishlist) => {setWishlist(updatedWishlist)})
        )
    }
    

    const handleClickDeleteWishlistFilm = (event) => {
        console.log(event.target.value)
        deleteFilmFromWishlist(event.target.value)
    }


    const wishlistDisplay = wishlist.map((film) => 
        <div key = {film.id} class="wishlist_film">
            <ul class="carousel">
            <Grid>
                <Item>
                    <li class = "card">
                        <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" class="poster_image"/>
                        <h1>{film.title}</h1>
                        <p>Average rating: {film.vote_average}</p>
                        <p>{film.overview}</p>
                        <button value = {film._id} onClick ={handleClickDeleteWishlistFilm }>Remove from wishlist</button>
                    </li>
                </Item>
            </Grid>
            </ul>
        </div>
    )

    return(
        <Box sx={{ flexGrow:1 }}>
            <Grid container spacing={3}>
                <ul>{wishlistDisplay}</ul>
            </Grid>
        </Box>
    )

}
export default WishlistIndividualFilm