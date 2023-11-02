import React from "react";
import './Recommendations.css'
import RecommededFilms from "../components/Recommendations_Films";
import Carousel from "../components/Carousel"

const Recommendations = ({ wishlist, setWishlist, ratedFilms, setRatedFilms, recommendedCategory, recommendedFilms }) => (
    <div className="recommendations_page">
        <h1>Recommendations</h1>
        {/* <RecommededFilms wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} recommendedCategory={recommendedCategory} recommendedFilms={recommendedFilms} /> */}
        {(recommendedCategory != undefined) ? <h2>Since <i>{recommendedCategory.name}</i> is a <i>{recommendedCategory.category}</i>, why not try one of the following films:</h2> : <h2>Recommendations will appear once we have more data.</h2>}
        <Carousel listOfFilms={recommendedFilms} wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms}  />
    </div>
)

export default Recommendations