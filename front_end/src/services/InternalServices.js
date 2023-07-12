// const baseURL = 'http://localhost:8080/wishlist'

export const getWishlistItem=(id)=>{
    return fetch(baseURL + id)
    .then (response => response.json())
}

export const getWishlist=()=>{
    return fetch(baseURL)
    .then (response => response.json())
}

export const updateWishlist = (id) => {
    return fetch(baseURL + id, {method: 'PUT'})
    .then((response) => response.json())
}