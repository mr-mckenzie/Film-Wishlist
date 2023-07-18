import InternalServices from "../services/InternalServices";
import StatisticsFunctions from "../services/StatisticsFunctions"
import { BarChart, Bar, XAxis} from "recharts";

const RatedFilmsInfo = ({ratedFilms}) => {


    const mostWatchedGenres = StatisticsFunctions.getArrayOfGenresByMostWatched(ratedFilms)
    const highestRatedGenres = StatisticsFunctions.getArrayOfGenresByRating(ratedFilms)
    const mostWatchedActors = StatisticsFunctions.getArrayOfActorsByMostWatched(ratedFilms)
    const highestRatedActors = StatisticsFunctions.getArrayOfActorsByRating(ratedFilms)

    const mapMostWatched = (array) => {
        return array.map( element => {
            return <li>{element[0]} - {element[2]}</li>
        } )
    }

    const mapHighestRated = (array) => {
        return array.map( element => {
            return <li>{element[0]} - {Math.round(element[3]*100)/100}</li>
        } )
    }

    return (
        <div>
            <p>Films watched: {ratedFilms.length} </p>
            <p>Total minutes watched: {StatisticsFunctions.getTotalRuntime(ratedFilms)}</p>
            <p>Total hours watched: {StatisticsFunctions.getTotalRuntime(ratedFilms) / 60}</p>
            { ratedFilms.length>0 ? 
            <ul>
                <p>Most watched actor:</p> 
                {mapMostWatched(mostWatchedActors.slice(0,7))}
            </ul> 
            :
            <></>}
            { ratedFilms.length>0 ? 
            <ul>
                <p>Higest rated actor: </p> 
                {mapHighestRated(highestRatedActors.slice(0,7))}
            </ul>
            : 
            <></>}
            { ratedFilms.length>0 ? 
            <ul>
                <p>Most watched genre:</p> 
                {mapMostWatched(mostWatchedGenres.slice(0,7))}
            </ul> 
            :
            <></>}          
            { ratedFilms.length>0 ? 
            <ul>
                <p>Higest rated genre: </p> 
                {mapHighestRated(highestRatedGenres.slice(0,7))}
            </ul>
            : 
            <></>}
        </div>
    )
}
export default RatedFilmsInfo