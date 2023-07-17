import React from "react";
import WishlistFilms from "../components/Wishlist_Films";

const Wishlist = ({wishlist, setWishlist}) => (
    <div class="wishlist">
        <h4>Wishlist</h4>
        <WishlistFilms wishlist={wishlist} setWishlist={setWishlist}/>
        
    </div>
)

export default Wishlist