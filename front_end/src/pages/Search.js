import React from "react";
import SearchForm from '../components/Search_SearchForm';
import SearchResults from '../components/Search_SearchResults';

const Search = ({films, setFilms, setSelectedFilm}) => (
    <div>
        <h4>Search</h4>
        <SearchForm films={films} setFilms={setFilms}/> 
        <SearchResults films={films} setSelectedFilm={setSelectedFilm}/>
    </div>
)

export default Search