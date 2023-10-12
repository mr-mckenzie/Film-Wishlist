import InternalServices from "./InternalServices"

const RatingsFunctions = {

    addRatingToFilm(film, rating = null) {
        film["rating"] = rating
        return film
    },

    restructureCrew (film) {
        const crew = film["credits"]["crew"]
        const cast = film["credits"]["cast"]
        const reducedCrew = []
        for (const credit of crew) {
            //Selecting the fields in crew that are to be kept
            if (credit.department == "Writing" || credit.job == "Director" || credit.job.includes("Composer"))
            reducedCrew.push(credit)
        }
        delete film["credits"]
        film["crew"] = reducedCrew
        film["cast"] = cast
        return film
    },

    restructureFields (film) {
        delete film["adult"]
        delete film["backdrop_path"]
        delete film["belongs_to_collection"]
        delete film["homepage"]
        delete film["imdb_id"]
        delete film["popularity"]
        delete film["status"]
        delete film["video"]
        delete film["vote_count"]

        //keywords are stored inside an object called keywords which contains a second object called keywords with a value of an array
        //This removes the unnecessary second object
        const keywords = film["keywords"]["keywords"]
        film["keywords"] = keywords

        const spokenLanguages = film["spoken_languages"]
        const restructuredSpokenLanguages = []
        for (const language of spokenLanguages) {
            restructuredSpokenLanguages.push({"name" : language.english_name})
        }
        film["spoken_languages"] = restructuredSpokenLanguages

        return film
    },

    restructureAndRemoveFieldsFromFilm (film) {
        return this.restructureFields(this.restructureCrew(film))
    },

    postRatedFilmToDatabase (film, rating) {
        const ratedFilm = this.addRatingToFilm(film, rating)
        const ratedFilmWithCorrectFields = this.restructureAndRemoveFieldsFromFilm(ratedFilm)
        InternalServices.postFilmToDatabase(ratedFilmWithCorrectFields)
        return ratedFilmWithCorrectFields
    },

    postFilmToWishlist(film) {
        return this.postRatedFilmToDatabase(film, null)
    }
}

export default RatingsFunctions