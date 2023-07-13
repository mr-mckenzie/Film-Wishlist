import { useState } from 'react';
import Fullpage,{ FullPageSections, FullpageSection, FullpageNavigation } from "@ap.cx/react-fullpage";
import './App.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Ratings from './pages/Ratings';
import Statistics from './pages/Statistics';


function App() {

  const [films, setFilms] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedFilm, setSelectedFilm] = useState({})

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
                films={films} 
                setFilms={setFilms} 
                setSelectedFilm={setSelectedFilm}/>
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
                <Ratings/>
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Statistics/>
            </FullpageSection>
        </FullPageSections>
    </Fullpage>
  )
}

export default App;
