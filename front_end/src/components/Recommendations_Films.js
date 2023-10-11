import ExternalServices from "../services/ExternalServices"
import InternalServices from "../services/InternalServices"
import RatingComponent from "./Search_RatingComponent"

const RecommendedFilms = ({ wishlist, setWishlist, ratedFilms, setRatedFilms, recommendedCategory, recommendedFilms }) => {

    // adding the rating key value pair to api output
    // ALSO deletes crew from object
    const addRatingKeyValuePairAndDeleteCrew = (filmWithAddedRating, rating = null) => {
        filmWithAddedRating["rating"] = rating
        delete filmWithAddedRating["credits"]["crew"]
        return filmWithAddedRating
    }

    // add film to a rated films list
    const addToRatedFilms = (filmIdToAddToRatedFilms, rating) => {
        ExternalServices.getFilmById(filmIdToAddToRatedFilms)
            .then(ratedFilm => {
                const ratedFilmWithRating = addRatingKeyValuePairAndDeleteCrew(ratedFilm, rating)
                InternalServices.postFilmToDatabase(ratedFilmWithRating)
                setRatedFilms([...ratedFilms, ratedFilmWithRating])
            })
    }

    // add film to a wishlist
    const addToWishlist = (filmIdToAddToWishlist, rating = null) => {
        ExternalServices.getFilmById(filmIdToAddToWishlist)
            .then(wishlistFilm => {
                const wishlistFilmWithRating = addRatingKeyValuePairAndDeleteCrew(wishlistFilm, rating)
                InternalServices.postFilmToDatabase(wishlistFilmWithRating)
                setWishlist([...wishlist, wishlistFilmWithRating])
            })
    }

    // returning a grid of film titles and posters
    const recommendDisplay = (resultsToMap) => {
        let mappedResults = []
        console.log("THIS RUNS")
        console.log("RESULTS TO MAP: ", resultsToMap)
        if (resultsToMap && resultsToMap.length > 0) {
            console.log("running")
            mappedResults = resultsToMap.map(film => {
                return (
                    <div key={film.id} className="wishlist_card">
                        <div className="wishlist_poster_image">
                            <img src={ExternalServices.getFullPosterURLByPath(film.poster_path)} alt="film poster" />
                        </div>
                        <div className="wishlist_card_body">
                            <button className="wishlist_button" value={film._id} onClick={() => { addToWishlist(film.id) }}>Add to Wishlist</button>
                            <RatingComponent addToRatedFilms={addToRatedFilms} filmId={film.id} />
                            <h1 className="wishlist_card_title">{film.title}</h1>
                            <p>Average rating: {film.vote_average}</p>
                            <p>{film.overview}</p>
                        </div>
                    </div>
                )
            })
        }
        return mappedResults
    }

    return (
        <>
            {(recommendedCategory != undefined) ? <p>Because {recommendedCategory.name} is your {recommendedCategory.category}. </p> : null}
            <div className="wishlist_container">
                {recommendDisplay(recommendedFilms)}
            </div>
        </>
    )
}
export default RecommendedFilms