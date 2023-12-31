import React from "react";
import './Statistics.css'
import RatedFilmsInfo from "../components/Statistics_RatedFilmsInfo";

const Statistics = ({ratedFilms}) => (
    <div className="statistics_page">
        <h1>Statistics</h1>
        <RatedFilmsInfo ratedFilms={ratedFilms}/>
    </div>
)

export default Statistics