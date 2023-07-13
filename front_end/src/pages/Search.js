import React from "react";
import SearchForm from '../components/Search_SearchForm';
import SearchResults from '../components/Search_SearchResults';

const Search = ({listOfFilmsFromAPI, setListOfFilmsFromAPI, setSelectedFilm}) => (
    <div>
        <h4>Search</h4>
        <SearchForm setListOfFilmsFromAPI={setListOfFilmsFromAPI}/> 
        <SearchResults listOfFilmsFromAPI={listOfFilmsFromAPI} setSelectedFilm={setSelectedFilm}/>
    </div>
)

export default Search