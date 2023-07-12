import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FullPageScroll from './FullPageScroll';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Ratings from './pages/Ratings';
import Statistics from './pages/Statistics';
import ErrorPage from './pages/ErrorPage';



function App() {

  // const [searchQuery, setSearchQuery] = useState("")
  // const [searchCategory, setSearchCategory] = useState()

  return (
    <FullPageScroll/>
    // <Router>
    //   <NavBar/>
    //   {/* <div className="App"> */}
    //   <Routes>
    //     <Route exact path = "/" element = {<Home/>} />
    //     <Route path = "/search" element = {<Search/>} />
    //     <Route path = "/recommendations" element = {<Recommendations/>} />
    //     <Route path = "/wishlist" element = {<Wishlist/>} />
    //     <Route path = "/ratings" element = {<Ratings/>} />
    //     <Route path = "/statistics" element = {<Statistics/>} />
    //     <Route path = "*" element = {<ErrorPage/>} />
    //   </Routes>
    // </Router>
  );
}

export default App;
