import React from "react";
import TopRatedActors from "../components/Statistics_TopRatedActors";
import RatedFilmsInfo from "../components/Statistics_RatedFilmsInfo";

const Statistics = ({ratedFilms}) => (

    <>
        <h4>Statistics</h4>
        <TopRatedActors ratedFilms={ratedFilms}/>
        <RatedFilmsInfo ratedFilms={ratedFilms}/>
    </>
    
)

export default Statistics