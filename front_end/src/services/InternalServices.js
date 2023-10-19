const baseURL = 'http://localhost:9000/api/films'

const InternalServices = {

    getFilmByFilmId(film_id) {
        return fetch(baseURL + '/single/' + film_id)
        .then (response => response.json())
    },

    postFilmToDatabase(filmObject){
        return fetch(baseURL,
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

    getRatedFilms(){
        return fetch(baseURL + '/rating')
        .then (response => response.json())
    },

    deleteFilmByFilmID(film_id) {
        return fetch(baseURL + '/single/' + film_id, {method:'DELETE'})
    },

    updateFilm(film_id, filmObject) {
        return fetch(baseURL + '/single/' + film_id, {
            method: 'PUT',
            body: JSON.stringify(filmObject),
            headers: { 'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
    }
}
export default InternalServices