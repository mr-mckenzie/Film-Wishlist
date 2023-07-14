const baseURL = 'http://localhost:9000/api/films/'

export const getFilmById=(id)=>{
    return fetch(baseURL + id)
    .then (response => response.json())
}

export const postFilmToDatabase = (filmObject)=>{
    return fetch(baseURL
        // + filmObject.id
        , 
        {
        method: 'POST',
        body: JSON.stringify(filmObject),
        headers: { 'Content-Type': 'application/json'}
    })
    .then (response => response.json())
}

export const getAllFilms=()=>{
    return fetch(baseURL)
    .then (response => response.json())
}

export const updateChosenFilm = (id) => {
    return fetch(baseURL + id, {
        method: 'PUT'
    })
    .then((response) => response.json())
}