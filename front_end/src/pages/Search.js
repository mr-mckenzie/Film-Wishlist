import React from "react";
import SearchForm from '../components/SearchForm';
import FilmCarousel from '../components/FilmCarousel'

const Search = ({films, setFilms, setSelectedFilm}) => (
    <div>
        <h4>Search</h4>
        <SearchForm films={films} setFilms={setFilms}/> 
        <FilmCarousel films={films} setSelectedFilm={setSelectedFilm}/>
    </div>
)

export default Search