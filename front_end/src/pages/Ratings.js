import React from "react";
import RatedFilms from "../components/Ratings_RatedFilms";
import './Ratings.css'

const Ratings = ({ratedFilms, setRatedFilms}) => (
    <div class="ratings_page">
        <h1>Ratings</h1>
        <RatedFilms ratedFilms = {ratedFilms} setRatedFilms = {setRatedFilms}/>
    </div>
)

export default Ratings
