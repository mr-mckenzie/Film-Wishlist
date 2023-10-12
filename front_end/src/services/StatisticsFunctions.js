const StatisticsFunctions = {

    getTotalRuntime (list) {
        let sumOfRuntimes = 0
        for (const film of list) {
            sumOfRuntimes += film.runtime
        }
        return sumOfRuntimes
    },

    getFieldFromFilmList(list, field) {
        let counterObject = {}
        if (list.length > 0) {
            for (const film of list) {
                for (const element of film[field]) {
                    //in preference count over id field to avoid duplicate names
                    if (element.id) {
                        if (counterObject[element.id]) {
                            counterObject[element.id]["ratings"].push(film.rating)
                        } else {
                            counterObject[element.id] = {"name":element.name, "id": element.id, "ratings": [film.rating], "profile_path": (element["profile_path"] ? element["profile_path"] : null) }
                        }
                    //otherwise count over name field for those that do not have an id (such as language)
                    } else {
                        if (counterObject[element.name]) {
                            counterObject[element.name]["ratings"].push(film.rating)
                        } else {
                            counterObject[element.name] = {"name":element.name, "id": element.id, "ratings": [film.rating], "profile_path": (element["profile_path"] ? element["profile_path"] : null) }
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
        return this.getFieldFromFilmList(list, "cast")
    },

    getGenresInList (list) {
        return this.getFieldFromFilmList(list, "genres")
    },

    getKeywordsInList (list) {
        return this.getFieldFromFilmList(list, "keywords")
    },

    getSpokenLanguagesInList (list) {
        return this.getFieldFromFilmList(list, "spoken_languages")
    },

    sortByRating (object) {

        const arrayForSorting = [];
        for (const [key, value] of Object.entries(object)) {

            const numberOfRatings = value["ratings"].length

            let sumOfRatings = 0
            for (let i = 0; i<value["ratings"].length; i++) {
                sumOfRatings = sumOfRatings + value["ratings"][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name or id, value = array of individual ratings
            arrayForSorting.push({"name": value["name"], "id":value["id"], "ratings": value["ratings"], "number_of_ratings":numberOfRatings, "average_rating": averageRating, "profile_path": value["profile_path"]});
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

            const numberOfRatings = value["ratings"].length

            let sumOfRatings = 0
            for (let i = 0; i<value["ratings"].length; i++) {
                sumOfRatings = sumOfRatings + value["ratings"][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name or id, value = array of individual ratings
            arrayForSorting.push({"name": value["name"], "id":value["id"], "ratings": value["ratings"], "number_of_ratings":numberOfRatings, "average_rating": averageRating, "profile_path": value["profile_path"]});
        }

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
    
    getTopTenMostWatchedActors (list) {
        let topTenActors = this.getArrayOfActorsByMostWatched(list)
        if (topTenActors.length >= 10) {
            topTenActors = topTenActors.slice(0,10)
        }
        return topTenActors
    },

    getTopTenTopRatedActors (list) {
        let topTenActors = this.getArrayOfActorsByRating(list)
        if (topTenActors.length >= 10) {
            topTenActors = topTenActors.slice(0,10)
        }
        return topTenActors
    },

    removeDuplicatedFilms(listToBeChecked, listToCheckAgainst) {
        const checkedList = []

        for (const film of listToBeChecked) {
            let filmMatch = false
            for (const referenceFilm of listToCheckAgainst) {
                if (film.id == referenceFilm.id) {
                    filmMatch = true
                }
            }
            if (filmMatch == false) {
                checkedList.push(film)
            }
        }
        return checkedList
    },

    checkFilmOnList(filmId, referenceList) {
        let onList = false
        console.log("compare id: " + filmId)
        for (const referenceFilm of referenceList) {
            console.log("ref id: " + referenceFilm.id)
            
                if (filmId == referenceFilm.id) {
                    console.log("MATCH MATCH MATCH MATCH")
                    onList = true
                    break
                }
            }
        return onList
    }
    
}
export default StatisticsFunctions