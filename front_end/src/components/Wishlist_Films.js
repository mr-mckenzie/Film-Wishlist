import ExternalServices from "../services/ExternalServices";
import RatingsFunctions from "../services/RatingsFunctions";

const WishlistFilms = ({ wishlist, setWishlist }) => {

    const wishlistDisplay = wishlist.map((film) =>
        <div key={film.id} className="wishlist_card">
            <div className="wishlist_poster_image">
                <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
            </div>
            <div className="wishlist_card_body">
                <button className="wishlist_button" value={film._id} onClick={() => RatingsFunctions.deleteFilmFromWishlist(film.id, setWishlist)}>Remove from wishlist</button>
                <h1 className="wishlist_card_title">{film.title}</h1>
                <p>Average rating: {film.vote_average}</p>
                <p>{film.overview}</p>
            </div>
        </div>
    )

    return (
        <div className="wishlist_container">{wishlistDisplay}</div>
    )

}
export default WishlistFilms