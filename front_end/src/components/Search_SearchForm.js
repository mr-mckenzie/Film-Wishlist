import { useState } from "react"
import ExternalServices from "../services/ExternalServices"
import CategorySlider from "./Search_CategorySlider"
import FilmCarousel from "./Search_SearchResults"
import ClickableChips from "./Search_Chips"

const SearchForm = ({setListOfFilmsFromAPI}) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchCategory, setSearchCategory] = useState("title")
    const [keywords, setKeywords] = useState([])
    const [actors, setActors] = useState([])


    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
        let APIresponse
        if (searchCategory == "title"){
            APIresponse = ExternalServices.getFilmByTitle(event.target.value)
            .then(result => setListOfFilmsFromAPI(result));
        } else if (searchCategory == "actor") {
            APIresponse = ExternalServices.getActorByName(event.target.value)
            .then(result => setActors(result))
            // APIresponse.then(result => console.log(result))
        } else if (searchCategory == "keyword") {
            APIresponse = ExternalServices.getKeywordbyName(event.target.value)
            .then(result => setKeywords(result))
        }
    }

    const handleNewCategory = (event) => {
        setListOfFilmsFromAPI([])
        setSearchQuery("")
        setActors([])
        setKeywords([])
    }

    return (
        <div>
            <CategorySlider searchCategory={searchCategory} setSearchCategory={setSearchCategory} onClick={(handleNewCategory)}></CategorySlider>
            <form onSubmit = {handleSubmit}> 
                <input type="text" placeholder="search" onChange={handleChange} value={searchQuery}></input>
            </form>
            <ClickableChips searchResults={actors} setListOfFilmsFromAPI={setListOfFilmsFromAPI} actorOrKeyword={"actor"} />
            <ClickableChips searchResults={keywords} setListOfFilmsFromAPI={setListOfFilmsFromAPI} actorOrKeyword={"keyword"} />

        </div>
    )

}


export default SearchForm