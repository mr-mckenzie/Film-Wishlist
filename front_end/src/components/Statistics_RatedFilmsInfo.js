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

    const maxNumberOfEntries = 15

    return (

        <div className="wishlist_container">
            <div className = "wishlist_card">
                <p>Films watched: {ratedFilms.length} </p>
                <p>Total minutes watched: {StatisticsFunctions.getTotalRuntime(ratedFilms)}</p>
                <p>Total hours watched: {StatisticsFunctions.getTotalRuntime(ratedFilms) / 60}</p>
            </div>
                { ratedFilms.length>0 ? 
            <div className = "wishlist_card">
                <ul>
                    <p>Most watched actors:</p> 
                    {mapMostWatched(mostWatchedActors.slice(0,maxNumberOfEntries))}
                </ul> 
            </div>
            :
            <></>}
            { ratedFilms.length>0 ? 
            <div className = "wishlist_card">
                <ul>
                    <p>Higest rated actors: </p> 
                    {mapHighestRated(highestRatedActors.slice(0,maxNumberOfEntries))}
                </ul>
            </div>
            : 
            <></>}
            { ratedFilms.length>0 ? 
            <div className = "wishlist_card">
                <ul>
                    <p>Most watched genre:</p> 
                    {mapMostWatched(mostWatchedGenres.slice(0,maxNumberOfEntries))}
                </ul> 
            </div>
            :
            <></>}          
            { ratedFilms.length>0 ? 
            <div className = "wishlist_card">
                <ul>
                    <p>Higest rated genre: </p> 
                    {mapHighestRated(highestRatedGenres.slice(0,maxNumberOfEntries))}
                </ul>
            </div>
            : 
            <></>}
        </div>
    )
}
export default RatedFilmsInfo