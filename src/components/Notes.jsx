import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';

import searchContext from "../context/searchBar/searchContext";
import tagContext from '../context/tags/tagContext';

const Notes = (props) => {


    const context=useContext(noteContext);
    const {notes,pinnedNotes}=context;

    const TagContext=useContext(tagContext)
    const {tagSelected}=TagContext

    const SearchContext=useContext(searchContext)

    const {search} =SearchContext;

    const finalNotes=notes.filter((note)=>{
        return (!note.archived) && (!tagSelected || tagSelected===note.tag) &&(note.title.includes(search) || note.description.includes(search))
    })
    const finalPinnedNotes=pinnedNotes.filter((note)=>{
        return (!note.archived) && (!tagSelected || tagSelected===note.tag) &&(note.title.includes(search) || note.description.includes(search))
    })

    return (
        <div>

            <div>
                {(finalPinnedNotes.length!==0) && <h5 className="ms-5 mb-3">PINNED</h5>}
                <div className={" d-flex  flex-row justify-content-evenly align-items-center flex-wrap mb-3 "+ (finalPinnedNotes.length ? "" :"d-none")}>
                    {finalPinnedNotes.map((note)=>{
                        return <NoteItem note={note} key={note._id} showAlert={props.showAlert} />
                    })}
                </div>
            </div>
            
            <div>
                {(finalPinnedNotes.length!==0 && finalNotes.length!==0) && <h5 className="ms-5 my-3">OTHERS</h5>}
                <div className={" d-flex  flex-row justify-content-evenly align-items-center flex-wrap "+(finalNotes.length ? "" :"d-none")}>
                    {finalNotes.map((note)=>{
                        return <NoteItem note={note} key={note._id} showAlert={props.showAlert} />
                    })}
                </div>
                {(notes.length===0) && (pinnedNotes.length===0) &&  <h4 className="mt-5 p-3 text-dark text-center">This space doesn't look good like this just add a note and fill it !!!</h4>}
                {((notes.length!==0) || (pinnedNotes.length!==0)) && (finalNotes.length===0 && finalPinnedNotes.length===0) && <h4 className="mt-5 p-3 text-dark text-center">No notes to show!!!</h4>}
            </div>
        </div>
    )
}

export default Notes