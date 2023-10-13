import ExternalServices from "../services/ExternalServices"
import InternalServices from "../services/InternalServices"
import RatingsFunctions from "../services/RatingsFunctions"
import StatisticsFunctions from "../services/StatisticsFunctions"
import RatingComponent from "./Search_RatingComponent"

const RecommendedFilms = ({ wishlist, setWishlist, ratedFilms, setRatedFilms, recommendedCategory, recommendedFilms }) => {

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
                            {(StatisticsFunctions.checkFilmOnList(film.id, wishlist)) ? <p>It's already on your wishlist</p> : <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.addToWishlist(film.id, wishlist, setWishlist) }}>Add to Wishlist</button>}
                            <RatingComponent ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} filmId={film.id} />
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
            {(recommendedCategory != undefined) ? <h2>Since <i>{recommendedCategory.name}</i> is a <i>{recommendedCategory.category}</i>, why not try one of the following films:</h2> : <h2>Recommendations will appear once we have more data.</h2>}
            <div className="wishlist_container">
                {/* If on rated list, removed from list and cannot be recommended */}
                {recommendDisplay(StatisticsFunctions.removeDuplicatedFilms(recommendedFilms, ratedFilms))}
            </div>
        </>
    )
}
export default RecommendedFilms