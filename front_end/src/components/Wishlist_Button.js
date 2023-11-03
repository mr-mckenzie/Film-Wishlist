import StatisticsFunctions from "../services/StatisticsFunctions"
import RatingsFunctions from "../services/RatingsFunctions"

const Wishlist_Button = ({ film, wishlist, setWishlist, ratedFilms }) => {

    if (!StatisticsFunctions.checkFilmOnList(film.id, ratedFilms)) {
        return (
            <>
            {(StatisticsFunctions.checkFilmOnList(film.id, wishlist)) ?
                <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.deleteFilmFromWishlist(film.id, setWishlist) }}>Remove from Wishlist</button> :
                <button className="wishlist_button" value={film._id} onClick={() => { RatingsFunctions.addToWishlist(film.id, wishlist, setWishlist) }}>Add to Wishlist</button>}
            </>)
    } else {
    return (<></>)
    }
}


export default Wishlist_Button