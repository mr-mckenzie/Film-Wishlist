const StatisticsFunctions = {

    getTotalRuntime (list) {
        let sumOfRuntimes = 0
        for (const film of list) {
            sumOfRuntimes += film.runtime
        }
        return sumOfRuntimes
    },

        getActorsInList (list) {
            let actorCounterObject = {}
            if (list.length > 0){
                for (const film of list) {
                    for (const castMember of film.credits.cast) {
                        //MAYBE CHANGE THIS TO ACTOR ID INSTEAD OF NAME?
                        if (actorCounterObject[castMember.name]) {
                            actorCounterObject[castMember.name].push(film.rating)
                        } else {
                            actorCounterObject[castMember.name] = [film.rating]
                        }
                    }
                }

                for (const [key, value] of Object.entries(actorCounterObject)) {
                    if (value.length == 1) {
                        delete actorCounterObject[key]
                    }
                }
            }
            return actorCounterObject
        },

        getGenresInList (list) {
            let genreCounterObject = {}
            for (const film of list) {
                for (const genre of film.genres) {
                    //MAYBE CHANGE THIS TO GENRE ID INSTEAD OF NAME?
                    if (genreCounterObject[genre.name]) {
                        genreCounterObject[genre.name].push(film.rating)
                    } else {
                        genreCounterObject[genre.name] = [film.rating]
                        
                    }
                }
            }

            for (const [key, value] of Object.entries(genreCounterObject)) {
                if (value.length == 1) {
                    delete genreCounterObject[key]
                }
            }
            return genreCounterObject
        },

        sortByRating (object) {

            const arrayForSorting = [];
            for (const [key, value] of Object.entries(object)) {
                //console.log("key", key)
                //console.log("value", value)

                const numberOfRatings = value.length

                let sumOfRatings = 0
                for (let i = 0; i<value.length; i++) {
                    sumOfRatings = sumOfRatings + value[i]
                }

                const averageRating = sumOfRatings/numberOfRatings

                //key = name, value = array of individual ratings
                arrayForSorting.push([key, value, numberOfRatings, averageRating]);
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

                const numberOfRatings = value.length

                let sumOfRatings = 0
                for (let i = 0; i<value.length; i++) {
                    sumOfRatings = sumOfRatings + value[i]
                }

                const averageRating = sumOfRatings/numberOfRatings

                //key = name, value = array of individual ratings
                arrayForSorting.push([key, value, numberOfRatings, averageRating]);
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
        }

}
export default StatisticsFunctions