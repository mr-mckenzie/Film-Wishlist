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
        .then(response => response.results)
        .catch(err => console.error(err));

        return resultFromFetch

    },

    getActorByName(actor) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: "bearer " + API_readAccessToken
            }
          };
          
          fetch(`https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => response.results)
            .catch(err => console.error(err));
    },

    getFilmByKeyword (keyword) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: "bearer " + API_readAccessToken
            }
          };
          
       fetch(`https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`, options)
            .then(response => response.json())
            .then(response => response["results"][0]["id"])
            .then(response => fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_keywords=${response}`, options))
            .then(response => response.json())
            .then(response => response.results)
            .catch(err => console.error(err));
    },

    getKeyword (keyword) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: "bearer " + API_readAccessToken
            }
          };
          
       const keywordArray = fetch(`https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        
            return keywordArray
    },

    getFullPosterURLByPath (Path) {
      const baseURL = 'https://image.tmdb.org/t/p/w154'
      return baseURL+Path
    }
}

export default ExternalServices;