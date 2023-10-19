import React from "react";
import WishlistFilms from "../components/Wishlist_Films";
import './Wishlist.css'


const Wishlist = ({wishlist, setWishlist}) => (
    <div className="wishlist_page">
        <h1>Wishlist</h1>
        <WishlistFilms wishlist={wishlist} setWishlist={setWishlist}/>
    </div>
)

export default Wishlist