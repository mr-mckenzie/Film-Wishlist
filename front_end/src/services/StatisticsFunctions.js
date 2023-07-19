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
                            counterObject[element.name][0].push(film.rating)
                        } else {
                            counterObject[element.name] = [[film.rating], [element["profile_path"]]]
                        }
                    }
                } else {
                for (const element of film[field]) {
                    //MAYBE CHANGE THIS TO ID INSTEAD OF NAME?
                    if (counterObject[element.name]) {
                        counterObject[element.name][0].push(film.rating)
                    } else {
                        counterObject[element.name] = [[film.rating],[element["profile_path"]]]
                    }
                }
            }
        }
            for (const [key, value] of Object.entries(counterObject)) {
                if (value[0].length == 1) {
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

            const numberOfRatings = value[0].length

            let sumOfRatings = 0
            for (let i = 0; i<value[0].length; i++) {
                sumOfRatings = sumOfRatings + value[0][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name, value = array of individual ratings
            arrayForSorting.push([key, value[0], numberOfRatings, averageRating, value[1]]);
        }
        
        //console.log("Array for Sorting:", arrayForSorting)

        const sortingFunction = (a, b) => {
            //first sort by rating
            if (a[3] > b[3]) {
                return -1
            } else if (a[3] < b[3]) {
                return 1
            //then sort by number of films watched
            } else if (a[2] > b[2]) {
                return -1 
            } else if (a[2] < b[2]) {
                return 1
            //then sort alphabetically
            } else if (a[0] > b[0]) {
                return -1 
            } else if (a[0] < b[0]) {
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

            const numberOfRatings = value[0].length

            let sumOfRatings = 0
            for (let i = 0; i<value[0].length; i++) {
                sumOfRatings = sumOfRatings + value[0][i]
            }

            const averageRating = sumOfRatings/numberOfRatings

            //key = name, value = array of individual ratings
            arrayForSorting.push([key, value[0], numberOfRatings, averageRating, value[1]]);
        }
        
        //console.log("Array for Sorting:", arrayForSorting)

        const sortingFunction = (a, b) => {
            // sort by most watched
            if (a[2] > b[2]) {
                return -1
            } else if (a[2] < b[2]) {
                return 1
            // then sort by higest rated
            } else if (a[3] > b[3]) {
                return -1 
            } else if (a[3] < b[3]) {
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