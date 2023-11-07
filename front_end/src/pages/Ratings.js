import React from "react";
//import RatedFilms from "../components/Ratings_RatedFilms";
import './Ratings.css'
import Carousel from "../components/Carousel";

const Ratings = ({ratedFilms, setRatedFilms, wishlist, setWishlist}) => (
    <div className="ratings_page">
        <h1>Ratings</h1>
        {/* <RatedFilms ratedFilms = {ratedFilms} setRatedFilms = {setRatedFilms}/> */}
        <Carousel listOfFilms={ratedFilms} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms} wishlist={wishlist} setWishlist={setWishlist}/>
    </div>
)

export default Ratings
