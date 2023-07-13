import { useState } from "react"
import ExternalServices from "../services/ExternalServices"
import CategorySlider from "./Search_CategorySlider"
import FilmCarousel from "./Search_SearchResults"

const SearchForm = ({setListOfFilmsFromAPI}) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchCategory, setSearchCategory] = useState("title")


    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
        let APIresponse
        if (searchCategory == "title"){
            APIresponse = ExternalServices.getFilmByTitle(event.target.value)
        } else if (searchCategory == "actor") {
            APIresponse = ExternalServices.getActorByName(event.target.value)
        } else if (searchCategory == "keyword") {
            APIresponse = ExternalServices.getFilmByKeyword(event.target.value)
        }
        APIresponse.then(result => setListOfFilmsFromAPI(result));
    }

    return (
        <div>
            <CategorySlider searchCategory={searchCategory} setSearchCategory={setSearchCategory}></CategorySlider>
            <form onSubmit = {handleSubmit}> 
                <input type="text" placeholder="search" onChange={handleChange} value={searchQuery}></input>
            </form>

        </div>
    )

}


export default SearchForm