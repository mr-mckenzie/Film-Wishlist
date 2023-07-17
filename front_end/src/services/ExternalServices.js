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

    getFilmById(id) {

      const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: "bearer " + API_readAccessToken
        }
        };
        
        const resultFromFetch = fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,keywords`, options)
        .then(promiseFromAPI => promiseFromAPI.json())
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
          
          const resultFromFetch = fetch(`https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => response.results)
            .catch(err => console.error(err));

          return resultFromFetch
    },

    getFilmsByActorId(actorId) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: "bearer " + API_readAccessToken
        }
      };
      
   const resultFromFetch = fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=10&with_cast=${actorId}&with_runtime.gte=60`, options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));

    return resultFromFetch
    },


    getKeywordbyName (keyword) {
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: "bearer " + API_readAccessToken
          }
        };

        const keywordArray = fetch(`https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`, options)
        .then(response => response.json())
        .then(response => response.results)
        .catch(err => console.error(err));
    
        return keywordArray
},

    getFilmsByKeywordId (keywordId) {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: "bearer " + API_readAccessToken
            }
          };
          
       const resultFromFetch = fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=10&with_keywords=${keywordId}&with_runtime.gte=60`, options)
            .then(response => response.json())
            .then(response => response.results)
            .catch(err => console.error(err));

        return resultFromFetch
    },


    getFullPosterURLByPath (path) {
      const baseURL = 'https://image.tmdb.org/t/p/w342'
      return baseURL+path
    },

    getFullActorImageURLByPath (path) {
      const baseURL = 'http://image.tmdb.org/t/p/w45'
      return baseURL+path
    }

    // availible poster sizes for ^^^^^^^ above route => ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
}

export default ExternalServices;