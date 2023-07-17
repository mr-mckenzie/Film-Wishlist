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
        return fetch(baseURL + '/rated')
        .then (response => response.json())
    },

    updateChosenFilm(id) {
        return fetch(baseURL + id, {
            method: 'PUT'
        })
        .then((response) => response.json())
    }
}
export default InternalServices