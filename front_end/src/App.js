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
    useEffect(() => {
        InternalServices.getWishlistFilms()
        .then((wishlistFilms) => {
            setWishlist(wishlistFilms)
        })
        .catch(() => {
            //if no response (e.g. backend not running) go with empty wishlist
            console.log("Warning - no database not connected - no data persistance")
            setWishlist([])
        })
    }, [])

    // populating rated list from database
    useEffect(() => {
        InternalServices.getRatedFilms()
        .then((films) => {
            setRatedFilms(films)
        })
        .catch(() => {
            //if no response (e.g. backend not running) go with empty wishlist
            console.log("Warning - database not connected - no data persistance")
            setRatedFilms([])
        })
    }, [])

    //change recommendation category whenever rated films change
    useEffect(() => {
            const randomRecommendation = Math.floor(Math.random() * 2)
            //randomly pick a category to recommend
            if (randomRecommendation == 0) {
                const topActorArray = StatisticsFunctions.getTopTenTopRatedActors(ratedFilms)
                if (topActorArray.length > 0){
                    const randomActor = Math.floor(Math.random() * topActorArray.length)
                setRecommendedCategory({
                    "name": topActorArray[randomActor].name,
                    "category": "top rated actor",
                    "value": topActorArray[randomActor]
                })} else {
                    setRecommendedCategory(undefined)
                }
            } else if (randomRecommendation == 1) {
                const mostWatchedActorArray = StatisticsFunctions.getTopTenMostWatchedActors(ratedFilms)
                if (mostWatchedActorArray.length > 0){
                    const randomActor = Math.floor(Math.random() * mostWatchedActorArray.length)
                setRecommendedCategory({
                    "name": mostWatchedActorArray[randomActor].name,
                    "category": "most watched actor",
                    "value": mostWatchedActorArray[randomActor]
                })} else {
                    setRecommendedCategory(undefined)
                }
            } 
    }, [ratedFilms])

    //change recommended films whenever recommeded category changes
    useEffect(() => {
        if (recommendedCategory != undefined) {
            console.log("ID: ", recommendedCategory.value.id)
            if (recommendedCategory.category.includes("actor")){
                ExternalServices.getFilmsByActorId(recommendedCategory.value.id)
                .then(results => setRecommendFilms(results))
            } else {
                    ExternalServices.getFilmsByKeywordId(recommendedCategory.value.id)
                    .then(results => setRecommendFilms(results))
            }
        } else {
            setRecommendFilms([])
        }
    }, [recommendedCategory])

    const setWishlistWithDuplicateCheck = (filmToAdd) => {
        let match = false
        for (const film of wishlist) {
            if (film.id === filmToAdd.id) {
                console.log("same film, cannot add again")
                match = true
                break
            } 
        }
        if (match === false) {
            setWishlist([...wishlist, filmToAdd])
        }
    }

    const setRatedFilmsWithDuplicateCheck = (filmToAdd) => {
        let match = false
        for (const film of ratedFilms) {
            if (film.id === filmToAdd.id) {
                console.log("same film, cannot add again")
                match = true
                break
            } 
        }
        if (match === false) {
            setRatedFilms([...ratedFilms, filmToAdd])
        }
    }

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
                ratedFilms={ratedFilms}
                setRatedFilms={setRatedFilms}
                wishlist={wishlist} 
                setWishlist={setWishlist}/>
            </FullpageSection>
            <FullpageSection style={SectionStyle}>
                <Ratings
                    ratedFilms = {ratedFilms}
                    setRatedFilms = {setRatedFilms}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
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