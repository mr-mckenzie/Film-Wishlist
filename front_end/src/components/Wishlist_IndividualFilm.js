import ExternalServices from "../services/ExternalServices";
const WishlistIndividualFilm = ({wishlist}) => {

    const wishlistDisplay = wishlist.map((film) => 
        <div key = {film.id} class="wishlist_film">
                <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" class="poster_image"/>
                <h1>{film.title}</h1>
                <p>Average rating:{film.vote_average}</p>
                <p>{film.overview}</p>
                <button>Remove from wishlist (needs a function)</button>
        </div>
    )

    return(
        <ul>{wishlistDisplay}</ul>
    )
}

export default WishlistIndividualFilm