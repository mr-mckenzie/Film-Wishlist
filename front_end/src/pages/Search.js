import React from "react";
import SearchForm from '../components/Search_SearchForm';
import SearchResults from '../components/Search_SearchResults';
import './Search.css'
import Carousel from "../components/Carousel";

const Search = ({listOfFilmsFromAPI, setListOfFilmsFromAPI, wishlist, setWishlist, ratedFilms, setRatedFilms}) => (
    <div className="search_page">
        <h1>Search</h1>
        <SearchForm setListOfFilmsFromAPI={setListOfFilmsFromAPI}/> 
        {/* <SearchResults listOfFilmsFromAPI={listOfFilmsFromAPI} wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms}/> */}
        <Carousel listOfFilms={listOfFilmsFromAPI} wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms}/>
    </div>
)

export default Search