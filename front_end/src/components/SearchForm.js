import { useState } from "react"
import ExternalServices from "../services/ExternalServices"
import CategorySlider from "./CategorySlider"

const SearchForm = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchCategory, setSearchCategory] = useState()


    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
        ExternalServices.getFilmByTitle(event.target.value)
    }

    return (
        <div>
            <CategorySlider></CategorySlider>
            <form onSubmit = {handleSubmit}> 
                <input type="text" placeholder="search" onChange={handleChange} value={searchQuery}></input>
            </form>
        </div>
    )

}


export default SearchForm