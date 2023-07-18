import React from "react";
import TopRatedActors from "../components/Statistics_TopRatedActors";
import './Statistics.css'

const Statistics = ({ratedFilms}) => (
    <div className="statistics_page">
        <h1>Statistics</h1>
        <TopRatedActors ratedFilms={ratedFilms}/>
    </div>
)

export default Statistics