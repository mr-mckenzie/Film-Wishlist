import Film_Card from "./Film_Card"
import "./Carousel.css"

const Carousel = ({listOfFilms, ratedFilms, setRatedFilms, wishlist, setWishlist}) => {

    const mapFilms = (filmsToMap) => {
        let mappedFilms = []
        if (filmsToMap && filmsToMap.length > 0) {
            mappedFilms = filmsToMap.map(film => {
                return (
                    <Film_Card film ={film} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} wishlist={wishlist} setWishlist={setWishlist}/>
                )
            })
        }
        return mappedFilms
    }

    return(
        <div className="carousel">
            {mapFilms(listOfFilms)}
        </div>
    )
}

export default Carousel