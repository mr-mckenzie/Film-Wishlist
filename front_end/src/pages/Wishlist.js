import React from "react";
import WishlistFilms from "../components/Wishlist_Films";
import './Wishlist.css'


const Wishlist = ({wishlist, setWishlist}) => (
    <div class="wishlist_page">
        <h4>Wishlist</h4>
        <WishlistFilms wishlist={wishlist} setWishlist={setWishlist}/>
    </div>
)

export default Wishlist