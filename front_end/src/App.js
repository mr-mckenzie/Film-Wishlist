import { useEffect, useState } from 'react';
import Fullpage,{ FullPageSections, FullpageSection, FullpageNavigation } from "@ap.cx/react-fullpage";
import './App.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Ratings from './pages/Ratings';
import Statistics from './pages/Statistics';
import InternalServices from './services/InternalServices';
import { ClassNames } from '@emotion/react';



function App() {

    const [listOfFilmsFromAPI, setListOfFilmsFromAPI] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [ratedFilms, setRatedFilms] = useState([])


    // populating wishlist from database
    useEffect(() => { InternalServices.getWishlistFilms()
        .then(wishlistFilms => setWishlist(wishlistFilms))
        console.log("My Wishlist", wishlist)
    },[])

    // populating rated list from database
    useEffect(() => { InternalServices.getRatedFilms()
        .then(wishlistFilms => setRatedFilms(wishlistFilms))
    },[])


    const SectionStyle = {
      // input height/width/display etc as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
    <Fullpage>
        <FullpageNavigation/>
        <FullPageSections>
            <FullpageSection style={SectionStyle}>
                <Home/>
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Search 
                listOfFilmsFromAPI={listOfFilmsFromAPI} 
                setListOfFilmsFromAPI={setListOfFilmsFromAPI} 
                wishlist={wishlist}
                setWishlist={setWishlist}
                ratedFilms = {ratedFilms}
                setRatedFilms = {setRatedFilms}
                />
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Recommendations/>
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Wishlist 
                wishlist={wishlist} 
                setWishlist={setWishlist}/>
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Ratings
                    ratedFilms = {ratedFilms}
                    setRatedFilms = {setRatedFilms}
                />
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Statistics/>
            </FullpageSection>
        </FullPageSections>
    </Fullpage>
    )
}

export default App;
