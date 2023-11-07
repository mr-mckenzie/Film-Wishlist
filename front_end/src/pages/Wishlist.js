import React from "react";
//import WishlistFilms from "../components/Wishlist_Films";
import './Wishlist.css'
import Carousel from "../components/Carousel";


const Wishlist = ({wishlist, setWishlist, ratedFilms, setRatedFilms}) => (
    <div className="wishlist_page">
        <h1>Wishlist</h1>
        {/* <WishlistFilms wishlist={wishlist} setWishlist={setWishlist}/> */}
        <Carousel listOfFilms={wishlist} wishlist={wishlist} setWishlist={setWishlist} ratedFilms={ratedFilms} setRatedFilms={setRatedFilms}/>
    </div>
)

export default Wishlist