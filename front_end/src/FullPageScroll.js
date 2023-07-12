import React from "react";
import Fullpage,{ FullPageSections, FullpageSection, FullpageNavigation } from "@ap.cx/react-fullpage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Ratings from './pages/Ratings';
import Statistics from './pages/Statistics';
import NavBar from "./components/NavBar";

const FullPageScroll = ({films, setFilms, wishlist, setWishlist, setSelectedFilm}) => {
    const SectionStyle = {
        // input height/width/display etc as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <Fullpage>
            <FullpageNavigation/>
            {/* <NavBar/> */}
            <FullPageSections>
                <FullpageSection style={SectionStyle}>
                    <Home/>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <Search films={films} setFilms={setFilms} setSelectedFilm={setSelectedFilm}/>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <Recommendations/>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <Wishlist wishlist={wishlist} setWishlist={setWishlist}/>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <Ratings/>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <Statistics/>
                </FullpageSection>
            </FullPageSections>
        </Fullpage>
    )
}

export default FullPageScroll