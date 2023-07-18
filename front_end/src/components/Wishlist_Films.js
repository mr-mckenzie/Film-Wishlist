import ExternalServices from "../services/ExternalServices";
import InternalServices from "../services/InternalServices";



const WishlistFilms = ({wishlist, setWishlist}) => {

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
        <li  key = {film.id} className = "wishlist_card">
            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" className="wishlist_poster_image"/>
            <h1>{film.title}</h1>
            <p>Average rating: {film.vote_average}</p>
            <p>{film.overview}</p>
            <button value = {film._id} onClick ={handleClickDeleteWishlistFilm }>Remove from wishlist</button>
            <br></br>
        </li>
    )

    return(
        <ul className="wishlist_container">{wishlistDisplay}</ul>
    )

}
export default WishlistFilms