import { Link } from "react-router-dom"

const NavBar = () => {

    return(
        <div>
            <ul>
                <Link to = '/'>
                    <li>Home</li>
                </Link>
                <Link to = '/search'>
                    <li>Search</li>
                </Link>
                <Link to = '/recommendations'>
                    <li>Recommendations</li>
                </Link>
                <Link to = '/wishlist'>
                    <li>Wishlist</li>
                </Link>
                <Link to = '/ratings'>
                    <li>Ratings</li>
                </Link>
                <Link to = '/statistics'>
                    <li>Statistics</li>
                </Link>
            </ul>
        </div>

    )
}
export default NavBar