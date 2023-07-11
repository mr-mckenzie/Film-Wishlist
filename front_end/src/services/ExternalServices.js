import API_readAccessToken from "../APIKey/.key";
const ExternalServices = {

    getFilmByTitle(title) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: "bearer " + API_readAccessToken
        }
        };
        
        const resultFromFetch = fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    }
}

export default ExternalServices;