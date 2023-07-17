import React from "react";
import SearchForm from '../components/Search_SearchForm';
import SearchResults from '../components/Search_SearchResults';
import './Search.css'

const Search = ({listOfFilmsFromAPI, setListOfFilmsFromAPI, wishlist, setWishlist}) => (
    <div className="search_page">
        {/* <h4>Search</h4> */}
        <SearchForm setListOfFilmsFromAPI={setListOfFilmsFromAPI}/> 
        <SearchResults listOfFilmsFromAPI={listOfFilmsFromAPI} wishlist={wishlist} setWishlist={setWishlist}/>
    </div>
)

export default Search