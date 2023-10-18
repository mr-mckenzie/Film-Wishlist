import InternalServices from "./InternalServices"
import ExternalServices from "./ExternalServices"

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
        let ratedFilm = this.addRatingToFilm(film, rating)
        //If film is new to DB (has no "_id" field) then restructure and post
        if (!film["_id"]) {
            ratedFilm = this.restructureAndRemoveFieldsFromFilm(ratedFilm)
            InternalServices.postFilmToDatabase(ratedFilm)
        //Otherwise update film already in DB
        } else {
            InternalServices.updateFilm(film["_id"], ratedFilm)
        }
        return ratedFilm
    },

    postFilmToWishlist(film) {
        return this.postRatedFilmToDatabase(film, null)
    },

    checkFilmOnList(filmId, referenceList) {
        let onList = false
        for (const referenceFilm of referenceList) {
                if (filmId == referenceFilm.id) {
                    console.log("MATCH MATCH MATCH MATCH")
                    onList = true
                    break
                }
            }
        return onList
    },

    //STILL ALLOWS YOU TO ADD SAME FILM TO RATED LIST SINCE FILMS ONLY CHECKED AGAINST THOSE IN WISHLIST
    addToWishlist(wishlistFilmId, list, setList) {
        if (this.checkFilmOnList(wishlistFilmId, list) == false) {
            ExternalServices.getFilmById(wishlistFilmId)
            .then( wishlistFilm => {
                const wishlistFilmWithRating = RatingsFunctions.postFilmToWishlist(wishlistFilm)
                setList([...list, wishlistFilmWithRating])
            })
        } else {
            console.log("Cannot add to wishlist - film is already on wishlist")
        }
    },

    //STILL ALLOWS YOU TO ADD SAME FILM TO WISHLIST SINCE FILMS ARE ONLY CHECKED AGAINST THOSE IN RATED LIST
    addToRatedFilms(ratedFilmId, rating, list, setList) {
        if (this.checkFilmOnList(ratedFilmId, list) == false){
        ExternalServices.getFilmById(ratedFilmId)
        .then(ratedFilm => { 
            const ratedFilmWithRating = RatingsFunctions.postRatedFilmToDatabase(ratedFilm, rating)
            setList([...list, ratedFilmWithRating])
        })} else {
            InternalServices.getFilmByFilmId(ratedFilmId)
            .then(filmFromDB => { 
                const ratedFilmWithRating = RatingsFunctions.postRatedFilmToDatabase(filmFromDB, rating)
                const updatedList = [...list]
                for (const film of updatedList) {
                    if (film.id == ratedFilmWithRating.id) {
                        updatedList.splice(updatedList.indexOf(film), 1, ratedFilmWithRating)
                        break
                    }
                }
                setList(updatedList)
            })
        }
    },

        deleteFilmFromRatedList(ratedFilmId, setList) {
            InternalServices.deleteFilmByFilmID(ratedFilmId)
            .then(() => InternalServices.getRatedFilms()
            .then((updatedRatedFilms) => {setList(updatedRatedFilms)})
            )
        },

        deleteFilmFromWishlist(wishlistFilmId, setList) {
            InternalServices.deleteFilmByFilmID(wishlistFilmId)
            .then(() => InternalServices.getWishlistFilms()
            .then((updatedWishlistFilms) => {setList(updatedWishlistFilms)})
            )
        }
}

export default RatingsFunctions