import React,{useState} from 'react'
import TagContext from "./tagContext"
const TagState = (props) => {

    const [tagSelected,setSelectedTag]=useState("")


    return (
        <TagContext.Provider value={{tagSelected,setSelectedTag}}>
            {props.children}
        </TagContext.Provider>
    )
}

export default TagState
