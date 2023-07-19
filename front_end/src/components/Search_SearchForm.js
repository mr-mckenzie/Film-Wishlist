import { useState } from "react"
import ExternalServices from "../services/ExternalServices"
import CategorySlider from "./Search_CategorySlider"
import Chips from "./Search_Actor_Keyword_Button"
import TextField from '@mui/material/TextField';

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
        } else if (searchCategory == "keyword") {
            APIresponse = ExternalServices.getKeywordbyName(event.target.value)
            .then(result => setKeywords(result))
        }
    }

    return (
            <form className="search_form" onSubmit = {handleSubmit}>
                <CategorySlider className="search_category" searchCategory={searchCategory} setSearchCategory={setSearchCategory} setActors={setActors} setKeywords={setKeywords} setSearchQuery={setSearchQuery} setListOfFilmsFromAPI={setListOfFilmsFromAPI}/>
                <TextField className="search_bar" id="search" label="Search" variant="outlined" onChange={handleChange} value={searchQuery}/>
                <div className="search_chips">
                    <Chips searchResults={actors} setListOfFilmsFromAPI={setListOfFilmsFromAPI} content={"actor"}/>
                    <Chips searchResults={keywords} setListOfFilmsFromAPI={setListOfFilmsFromAPI} content={"keyword"} />
                </div>
            </form>
    )

}


export default SearchForm