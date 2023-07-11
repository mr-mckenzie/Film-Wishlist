import { useState } from "react"

const SearchForm = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchCategory, setSearchCategory] = useState()

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
    }

    return (
        <div>
            <p>search Form</p>
    
        <form>
            
            <input type="text" placeholder="search" onChange={handleChange} value={searchQuery}></input>
        </form>
        </div>
    )

}


export default SearchForm