const WishlistFilms = ({wishlist}) => {

    const wishlistDisplay = wishlist.map((film) => 
        <div key = {film.id}>
            <li>{film.title}</li>
        </div>
    )

    return (
        <div>
            <ul>{wishlistDisplay}</ul>
        </div>
    )
}

export default WishlistFilms