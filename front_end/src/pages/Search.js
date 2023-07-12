import React from "react";
import SearchForm from '../components/SearchForm';
import FilmCarousel from '../components/FilmCarousel'

const Search = ({films, setFilms}) => (
    <div>
        <h4>Search</h4>
        <SearchForm films={films} setFilms={setFilms}/> 
        <FilmCarousel films={films}/>
    </div>
)

export default Search