import React from "react";
import TopRatedActors from "../components/Statistics_TopRatedActors";

const Statistics = ({ratedFilms}) => (

    <>
        <h4>Statistics</h4>
        <TopRatedActors ratedFilms={ratedFilms}/>
    </>
    
)

export default Statistics