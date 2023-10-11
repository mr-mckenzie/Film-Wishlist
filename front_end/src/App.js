import { useEffect, useState } from 'react';
import Fullpage,{ FullPageSections, FullpageSection, FullpageNavigation } from "@ap.cx/react-fullpage";
import './App.css';

// import Home from './pages/Home';
import Search from './pages/Search';
import Recommendations from'./pages/Recommendations';
import Wishlist from './pages/Wishlist';
import Ratings from './pages/Ratings';
import Statistics from './pages/Statistics';
import InternalServices from './services/InternalServices';
import { ClassNames } from '@emotion/react';
import ExternalServices from './services/ExternalServices';
import StatisticsFunctions from './services/StatisticsFunctions';

function App() {

    const [listOfFilmsFromAPI, setListOfFilmsFromAPI] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [ratedFilms, setRatedFilms] = useState([])
    const [recommendedCategory, setRecommendedCategory] = useState(undefined)
    const [recommendFilms, setRecommendFilms] = useState([])

    // populating wishlist from database
    useEffect(() => { InternalServices.getWishlistFilms()
        .then(wishlistFilms => setWishlist(wishlistFilms))
        // console.log("My Wishlist", wishlist)
    },[])

    // populating rated list from database
    useEffect(() => { InternalServices.getRatedFilms()
        .then(films => setRatedFilms(films))
    },[])

    //change recommendation category whenever rated films change
    useEffect(() => {
        if (ratedFilms.length > 0) {
            const randomRecommendation = Math.floor(Math.random() * 2)
            // console.log("random = ", randomRecommendation)
            //randomly pick a category to recommend
            if (randomRecommendation == 0) {
                const topActorArray = StatisticsFunctions.getArrayOfActorsByRating(ratedFilms)
                setRecommendedCategory({
                    "name": topActorArray[0].name,
                    "category": "top rated actor",
                    "value": topActorArray[0]
                })
            } else if (randomRecommendation == 1) {
                const mostWatchedActorArray = StatisticsFunctions.getArrayOfActorsByMostWatched(ratedFilms)
                setRecommendedCategory({
                    "name": mostWatchedActorArray[0].name,
                    "category": "most watched actor",
                    "value": mostWatchedActorArray[0]
                })
            }
        }
    }, [ratedFilms])

    //change recommended films whenever recommeded category changes
    useEffect(() => {
        if (recommendedCategory != undefined) {
            console.log("ID: ", recommendedCategory.value.id)
            ExternalServices.getFilmsByActorId(recommendedCategory.value.id)
                .then(results => setRecommendFilms(results))
        }
    }, [recommendedCategory])

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
            {/* <FullpageSection style={SectionStyle}>
                <Home/>
            </FullpageSection> */}
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
                <Recommendations
                recommendedCategory = {recommendedCategory}
                recommendedFilms = {recommendFilms}
                ratedFilms={ratedFilms}
                setRatedFilms={setRatedFilms}
                wishlist={wishlist}
                setWishlist={setWishlist}/>
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
                <Statistics
                    ratedFilms={ratedFilms}/>
            </FullpageSection>
        </FullPageSections>
    </Fullpage>
    )
}

export default App;