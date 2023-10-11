import React from "react";
import './Recommendations.css'
import RecommededFilms from "../components/Recommendations_Films";

const Recommendations = ({ wishlist, setWishlist, ratedFilms, setRatedFilms, recommendedCategory, recommendedFilms }) => (
    <div class="recommendations_page">
        <h1>Recommendations</h1>
        <RecommededFilms wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} recommendedCategory={recommendedCategory} recommendedFilms={recommendedFilms} />
    </div>
)

export default Recommendations