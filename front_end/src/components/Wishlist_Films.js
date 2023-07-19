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
        <div  key = {film.id} className = "wishlist_card">
            <div className="wishlist_poster_image">
                <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
            </div>
            <div className="wishlist_card_body">
                <h1 className= "wishlist_card_title">{film.title}</h1>
                <p>Average rating: {film.vote_average}</p>
                <p>{film.overview}</p>
                <button className="wishlist_button" value = {film._id} onClick ={handleClickDeleteWishlistFilm }>Remove from wishlist</button>
            </div>
        </div>
    )

    return(
        <div className="wishlist_container">{wishlistDisplay}</div>
    )

}
export default WishlistFilms