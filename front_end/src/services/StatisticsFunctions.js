const StatisticsFunctions = {

    getTotalRuntime (list) {
        let sumOfRuntimes = 0
        for (const film of list) {
            sumOfRuntimes += film.runtime
        }
        return sumOfRuntimes
    },

    getFieldFromFilmList (list, field, secondField=null) {
        let counterObject = {}
        if (list.length > 0){
            for (const film of list) {
                if (secondField) {
                    for (const element of film[field][secondField]) {
                        //MAYBE CHANGE THIS TO ID INSTEAD OF NAME?
                        if (counterObject[element.name]) {
                            counterObject[element.name]["ratings"].push(film.rating)
                        } else {
                            counterObject[element.name] = {"id" : element.id, "ratings":[film.rating], "profile_path": (element["profile_path"] ? element["profile_path"] : null)}
                        }
                    }
                } else {
                for (const element of film[field]) {
                    if (field === "spoken_languages") {

                        if (counterObject[element["english_name"]]) {
                            counterObject[element["english_name"]]["ratings"].push(film.rating)
                        } else {
                            counterObject[element["english_name"]] = {"id" : element.id, "ratings":[film.rating], "profile_path": null}
                        }

                        

                    } else if (counterObject[element.name]) {
                        counterObject[element.name]["ratings"].push(film.rating)
                    } else {
                        counterObject[element.name] = {"id" : element.id, "ratings":[film.rating], "profile_path": null}
                    }
                }
            }
        }
            for (const [key, value] of Object.entries(counterObject)) {
                if (value["ratings"].length < 2) {
                    delete counterObject[key]
                }
            }
        }
        return counterObject
    },

    getProductionsCountriesInList(list) {
        return this.getFieldFromFilmList(list, "production_countries")
    },

    getActorsInList(list) {
        return this.getFieldFromFilmList(list, "credits", "cast")
    },

    getGenresInList (list) {
        return this.getFieldFromFilmList(list, "genres")
    },

    getKeywordsInList (list) {
        return this.getFieldFromFilmList(list, "keywords", "keywords")
    },

    getSpokenLanguagesInList (list) {
        return this.getFieldFromFilmList(list, "spoken_languages")
    },

    sortByRating (object) {

        const arrayForSorting = [];
        for (const [key, value] of Object.entries(object)) {
            //console.log("key", key)
            //console.log("value", value)

            const numberOfRatings = value["ratings"].length

            let sumOfRatings = 0
            for (let i = 0; i<value["ratings"].length; i++) {
                sumOfRatings = sumOfRatings + value["ratings"][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name, value = array of individual ratings
            arrayForSorting.push({"name": key, "id":value["id"], "ratings": value["ratings"], "number_of_ratings":numberOfRatings, "average_rating": averageRating, "profile_path": value["profile_path"]});
        }
        
        //console.log("Array for Sorting:", arrayForSorting)

        const sortingFunction = (a, b) => {
            //first sort by rating
            if (a["average_rating"] > b["average_rating"]) {
                return -1
            } else if (a["average_rating"] < b["average_rating"]) {
                return 1
            //then sort by number of films watched
            } else if (a["number_of_ratings"] > b["number_of_ratings"]) {
                return -1 
            } else if (a["number_of_ratings"] < b["number_of_ratings"]) {
                return 1
            //then sort alphabetically
            } else if (a["name"] > b["name"]) {
                return -1 
            } else if (a["name"] < b["name"]) {
                return 1
            } else {
                return 0
            }
        }

        let sortedArray = arrayForSorting.sort(sortingFunction)

        return sortedArray
    },

    sortByMostWatched (object) {

        const arrayForSorting = [];
        for (const [key, value] of Object.entries(object)) {
            //console.log("key", key)
            //console.log("value", value)

            const numberOfRatings = value["ratings"].length

            let sumOfRatings = 0
            for (let i = 0; i<value["ratings"].length; i++) {
                sumOfRatings = sumOfRatings + value["ratings"][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name, value = array of individual ratings
            arrayForSorting.push({"name": key, "id":value["id"], "ratings": value["ratings"], "number_of_ratings":numberOfRatings, "average_rating": averageRating, "profile_path": value["profile_path"]});
        }
        
        //console.log("Array for Sorting:", arrayForSorting)

        const sortingFunction = (a, b) => {
            // sort by most watched
            if (a["number_of_ratings"] > b["number_of_ratings"]) {
                return -1
            } else if (a["number_of_ratings"] < b["number_of_ratings"]) {
                return 1
            // then sort by higest rated
            } else if (a["average_rating"] > b["average_rating"]) {
                return -1 
            } else if (a["average_rating"] < b["average_rating"]) {
                return 1
            } else {
                return 0
            }
        }

        let sortedArray = arrayForSorting.sort(sortingFunction)

        return sortedArray
    },

    getArrayOfGenresByRating(list) {
        const genresObject = this.getGenresInList(list)
        const arrayOfGenresSortedByRating = this.sortByRating(genresObject)
        return arrayOfGenresSortedByRating
    },

    getArrayOfGenresByMostWatched(list) {
        const genresObject = this.getGenresInList(list)
        const arrayOfGenresSortedByMostWatched = this.sortByMostWatched(genresObject)
        return arrayOfGenresSortedByMostWatched
    },

    getArrayOfActorsByRating (list) {
        const actorsObject = this.getActorsInList(list)
        const arrayOfActorsSortedByRating = this.sortByRating(actorsObject)
        return arrayOfActorsSortedByRating
    },

    getArrayOfActorsByMostWatched (list) {
        const actorsObject = this.getActorsInList(list)
        const arrayOfActorsSortedByMostWatched = this.sortByMostWatched(actorsObject)
        return arrayOfActorsSortedByMostWatched
    },

    getArrayOfKeywordsByRating (list) {
        const keywordsObject = this.getKeywordsInList(list)
        const arrayOfKeywordsSortedByRating = this.sortByRating(keywordsObject)
        return arrayOfKeywordsSortedByRating
    },

    getArrayOfKeywordsByMostWatched (list) {
        const keywordsObject = this.getKeywordsInList(list)
        const arrayOfKeywordsSortedByMostWatched = this.sortByMostWatched(keywordsObject)
        return arrayOfKeywordsSortedByMostWatched
    },

    getArrayOfCountriesByRating (list) {
        const countriesObject = this.getProductionsCountriesInList(list)
        const arrayOfCountriesSortedByRating = this.sortByRating(countriesObject)
        return arrayOfCountriesSortedByRating
    },

    getArrayOfCountriesByMostWatched (list) {
        const countriesObject = this.getProductionsCountriesInList(list)
        const arrayOfCountriesSortedByMostWatched = this.sortByMostWatched(countriesObject)
        return arrayOfCountriesSortedByMostWatched
    },
    
    getSpokenLanguagesByRating (list) {
        const languagesObject = this.getSpokenLanguagesInList(list)
        const languagesSortedByRating = this.sortByRating(languagesObject)
        return languagesSortedByRating
    }, 

    getSpokenLanguagesByMostWatched (list) {
        const languagesObject = this.getSpokenLanguagesInList(list)
        const languagesSortedByMostWatched = this.sortByMostWatched(languagesObject)
        return languagesSortedByMostWatched
    }, 


}
export default StatisticsFunctions