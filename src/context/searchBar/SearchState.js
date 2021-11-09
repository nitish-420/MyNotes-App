import React,{useState} from 'react'
import SearchContext from "./searchContext"
const SearchState = (props) => {

    const [search,setSearch]=useState("")



    return (
        <SearchContext.Provider value={{search,setSearch}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchState
