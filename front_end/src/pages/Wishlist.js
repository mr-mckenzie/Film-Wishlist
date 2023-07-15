import React from "react";
import WishlistFilms from "../components/Wishlist_Films";

const Wishlist = ({wishlist}) => (
    <div class="wishlist">
        <h4>Wishlist</h4>
        <WishlistFilms wishlist={wishlist}/>
        
    </div>
)

export default Wishlist