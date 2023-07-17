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
            for (const film of list) {
                for (const castMember of film.credits.cast) {
                    if (actorCounterObject[castMember.name]) {
                        actorCounterObject[castMember.name] += 1
                    } else {
                        actorCounterObject[castMember.name] = 1
                    }
                }
            }
            console.log(Object.keys(actorCounterObject))
            console.log(Object.values(actorCounterObject))


            for (const [key, value] of Object.entries(actorCounterObject)) {
                if (value == 1) {
                    delete actorCounterObject[key]
                }

            }
        console.log(actorCounterObject)}

}
export default InternalServices