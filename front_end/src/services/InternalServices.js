const baseURL = 'http://localhost:9000/api/films'

const InternalServices = {

    getFilmByFilmId(id) {
        return fetch(baseURL + '/film_id/' + id)
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

    updateFilm(id, filmObject) {
        return fetch(baseURL + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(filmObject),
            headers: { 'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
    }
}
export default InternalServices