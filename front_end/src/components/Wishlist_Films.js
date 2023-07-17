import ExternalServices from "../services/ExternalServices"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import WishlistIndividualFilm from "./Wishlist_IndividualFilm"

const WishlistFilms = ({wishlist, setWishlist}) => {

    // const wishlistDisplay = wishlist.map((film) => 
    //     <div key = {film.id} class="wishlist_film">
    //             <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" class="poster_image"/>
    //             <h1>{film.title}</h1>
    //             <p>Average rating:{film.vote_average}</p>
    //             <p>{film.overview}</p>
    //             <button>Remove from wishlist (needs a function)</button>
    //     </div>
    // )

    return (
        <div>
            <WishlistIndividualFilm wishlist = {wishlist} setWishlist={setWishlist}/>
        </div>
    )
}

export default WishlistFilms