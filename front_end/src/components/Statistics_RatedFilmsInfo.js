import StatisticsFunctions from "../services/StatisticsFunctions"
import ExternalServices from "../services/ExternalServices";
import Avatar from '@mui/material/Avatar';

const RatedFilmsInfo = ({ratedFilms}) => {


    const mostWatchedGenres = StatisticsFunctions.getArrayOfGenresByMostWatched(ratedFilms)
    const highestRatedGenres = StatisticsFunctions.getArrayOfGenresByRating(ratedFilms)
    const mostWatchedActors = StatisticsFunctions.getArrayOfActorsByMostWatched(ratedFilms)
    const highestRatedActors = StatisticsFunctions.getArrayOfActorsByRating(ratedFilms)
    const mostWatchedKeywords = StatisticsFunctions.getArrayOfKeywordsByMostWatched(ratedFilms)
    const higestRatedKeywords = StatisticsFunctions.getArrayOfKeywordsByRating(ratedFilms)
    const mostWatchedCountries = StatisticsFunctions.getArrayOfCountriesByMostWatched(ratedFilms)
    const highestRatedCountries = StatisticsFunctions.getArrayOfCountriesByRating(ratedFilms)
    const mostWatchedLanguages = StatisticsFunctions.getSpokenLanguagesByMostWatched(ratedFilms)
    const highestRatedLanguages = StatisticsFunctions.getSpokenLanguagesByRating(ratedFilms)

    const mapMostWatched = (array) => {
        return array.map( element => {
            return (element["profile_path"] ? 
            <p><Avatar src={ExternalServices.getFullActorImageURLByPath( element["profile_path"] )}/> {element["name"]} - {element["number_of_ratings"]}</p> 
            :
            <p className="statistics_fact"> {element["name"]} - {element["number_of_ratings"]}</p>
            )
        } )
    }

    const mapHighestRated = (array) => {
        return array.map( element => {
            return (element["profile_path"] ? 
            <p> <Avatar src={ExternalServices.getFullActorImageURLByPath( element["profile_path"] )}/> {element["name"]} - {Math.round(element["average_rating"]*100)/100}</p> 
            : 
            <p>{element["name"]} - {Math.round(element["average_rating"]*100)/100}</p>)
        } )
    }

    const maxNumberOfEntries = 8
    const maxNumberOfEntriesActor = 4

    return (

        <div className="statistics_container">
            <div className="stats_card">
                <div className="stats_poster_image"></div>
                <div className="stats_card_body">
                    <h1>Films watched: {ratedFilms.length} </h1>
                    <p>Total minutes watched: {StatisticsFunctions.getTotalRuntime(ratedFilms)}</p>
                    <p>Total hours watched: {Math.round((StatisticsFunctions.getTotalRuntime(ratedFilms)*100) / 60)/100}</p>
                </div>
            </div>
                { ratedFilms.length > 0 ? 
                <>
                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Most watched actors:</h1> 
                        {mapMostWatched(mostWatchedActors.slice(0,maxNumberOfEntriesActor))}
                    </div> 
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Highest rated actors: </h1> 
                        {mapHighestRated(highestRatedActors.slice(0,maxNumberOfEntriesActor))}
                    </div>
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Most watched genres:</h1> 
                        {mapMostWatched(mostWatchedGenres.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Highest rated genres: </h1> 
                        {mapHighestRated(highestRatedGenres.slice(0,maxNumberOfEntries))}
                    </div>
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Most watched keywords:</h1> 
                        {mapMostWatched(mostWatchedKeywords.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Highest rated keywords: </h1> 
                        {mapHighestRated(higestRatedKeywords.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className = "stats_card_body">
                        <h1>Most watched countries:</h1> 
                        {mapMostWatched(mostWatchedCountries.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Highest rated countries: </h1> 
                        {mapHighestRated(highestRatedCountries.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Most watched languages:</h1> 
                        {mapMostWatched(mostWatchedLanguages.slice(0,maxNumberOfEntries))}
                    </div> 
                </div>

                <div className = "stats_card">
                    <div className="stats_poster_image"></div>
                    <div className="stats_card_body">
                        <h1>Highest rated languages: </h1> 
                        {mapHighestRated(highestRatedLanguages.slice(0,maxNumberOfEntries))}
                    </div>
                </div> 
            </>
            : 
            <></>}
        </div>
    )
}
export default RatedFilmsInfo