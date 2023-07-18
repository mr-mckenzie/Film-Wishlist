const baseURL = 'http://localhost:9000/api/films'

const InternalServices = {

    getFilmById(id) {
        return fetch(baseURL + id)
        .then (response => response.json())
    },

    postFilmToDatabase(filmObject){
        return fetch(baseURL
            // + filmObject.id
            , 
            {
            method: 'POST',
            body: JSON.stringify(filmObject),
            headers: { 'Content-Type': 'application/json'}
        })
        .then (response => response.json())
    },

    getAllFilms() {
        return fetch(baseURL)
        .then (response => response.json())
    },

    getWishlistFilms(){
        return fetch(baseURL + '/wishlist')
        .then (response => response.json())
    },

    deleteWishlistFilmByID(id) {
        return fetch(baseURL +'/wishlist/'+ id, {
            method:'DELETE'
        })
    },

    getRatedFilms(){
        return fetch(baseURL + '/rating')
        .then (response => response.json())
    },

    deleteRatedFilm(id) {
        return fetch(baseURL +'/rating/'+ id, {
            method:'DELETE'
        })
    },

    updateChosenFilm(id) {
        return fetch(baseURL + id, {
            method: 'PUT'
        })
        .then((response) => response.json())
    }, 

        //MAYBE MOVE THIS FUNCTION TO STATS PAGE?
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

        sortByRating (object) {

            const arrayForSorting = [];
            for (const [key, value] of Object.entries(object)) {
                console.log("key", key)
                console.log("value", value)

                const numberOfRatings = value.length

                let sumOfRatings = 0
                for (let i = 0; i<value.length; i++) {
                    sumOfRatings = sumOfRatings + value[i]
                }

                const averageRating = sumOfRatings/numberOfRatings

                //Key = name, value = array of individual ratings
                arrayForSorting.push([key, value, numberOfRatings, averageRating]);
            }
            
            console.log("Array for Sorting:", arrayForSorting)

            const sortingFunction = (a, b) => {
                if (a[3] > b[3]) {
                    return -1
                } else if (a[3] < b[3]) {
                    return 1
                } else if (a[2] > b[2]) {
                    return -1 
                } else if (a[2] < b[2]) {
                    return 1
                } else {
                    return 0
                }
            }

            let sortedArray = arrayForSorting.sort(sortingFunction)

            return sortedArray
        },

        getArrayOfActorsSortedByRating (list) {
            const actorsObject = this.getActorsInList(list)
            const arrayOfActorsSortedByRating = this.sortByRating(actorsObject)
            return arrayOfActorsSortedByRating
        },

        //MOVE THIS FUNCTION TO STATS PAGE?
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
        console.log(genreCounterObject)}

}
export default InternalServices