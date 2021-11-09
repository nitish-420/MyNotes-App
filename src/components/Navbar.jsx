import React,{useContext,useEffect,useMemo} from "react";
import {Link,useLocation,useHistory} from "react-router-dom"
import searchContext from "../context/searchBar/searchContext";
import noteContext from "../context/notes/noteContext"
import tagContext from "../context/tags/tagContext"
import Time from "./Time";

function Navbar(props){

    const location=useLocation();
    let history=useHistory()

    
    const NoteContext=useContext(noteContext)

    const {notes,pinnedNotes}=NoteContext

    const context=useContext(searchContext)

    const {setSearch} =context;

    const TagContext=useContext(tagContext)

    const {tagSelected,setSelectedTag}=TagContext;


    
    const handleLogout=()=>{
        localStorage.removeItem("token")
        props.showAlert("Good Bye","danger")
        history.push("/login")
    }
    
    
    const handleSearchChange=(e)=>{
        const val=e.target.value
        setSearch(val)
    }
    
    
    const handleTagClick=(e)=>{
        setSelectedTag(e.target.name)
    }
    

    //tagSet starts here it is used to differentiate with tags.
    let tagSet=useMemo(()=>{
        return new Set()
    },[])

    tagSet.clear()
    notes.map((note)=>{
        if(location.pathname==='/'){
            if(!note.archived){
                tagSet.add(note.tag)
            }
        }
        else if(location.pathname==='/archive'){
            if(note.archived){
                tagSet.add(note.tag)
            }
        }
        return 1;
    })
    pinnedNotes.map((note)=>{
        if(location.pathname==='/'){
            if(!note.archived){
                tagSet.add(note.tag)
            }
        }
        else if(location.pathname==='/archive'){
            if(note.archived){
                tagSet.add(note.tag)
            }
        }
        return 1;
    })
    

    useEffect(()=>{
        tagSet.clear()
        notes.map((note)=>{
            if(location.pathname==='/'){
                if(!note.archived){
                    tagSet.add(note.tag)
                }
            }
            else if(location.pathname==='/archive'){
                if(note.archived){
                    tagSet.add(note.tag)
                }
            }
            return 1;
        })
        pinnedNotes.map((note)=>{
            if(location.pathname==='/'){
                if(!note.archived){
                    tagSet.add(note.tag)
                }
            }
            else if(location.pathname==='/archive'){
                if(note.archived){
                    tagSet.add(note.tag)
                }
            }
            return 1;
        })
    
        if(!tagSet.has(tagSelected)){
            setSelectedTag("")
        }
        
    },[location,notes,pinnedNotes,setSelectedTag,tagSelected,tagSet])

    return (
        <nav className="navbar mx-0 navbar-dark bg-dark row">
            <div className="d-flex p-0 m-0 mb-1 align-items-center col-12 col-sm-6 col-md-5 justify-content-evenly">
                <Link className={`m-0 p-0  nav-link ${location.pathname==="/archive" ? "text-light navbar-brand" : "text-muted"}`} data-toggle="tooltip" style={{fontSize:"1.1rem"}} title="Archived notes" to="/archive">MyNotes</Link>
                <Link className={`m-0 p-0  nav-link ${location.pathname==="/" ? "text-light navbar-brand" : "text-muted"}`} aria-current="page" to="/"  >Home</Link>
                <Link className={`m-0 p-0  nav-link ${location.pathname==="/about" ? "text-light navbar-brand" : "text-muted"}`} to="/about" >About</Link>
                {!localStorage.getItem("token") ?
                
                    <Link className={`m-0 p-0 nav-link ${location.pathname==="/login" ? "text-light navbar-brand" : "text-muted"}`} to="/login" >Login</Link>
                    :
                    <Link onClick={handleLogout} className={`m-0 p-0 text-muted nav-link `} to="/login"  >LogOut</Link>
                
                }
                
            </div>
            <div className="text-light d-none d-sm-block col-6 text-end text-md-start col-md-3 mb-1">
                <Time/>
            </div>
            <div className={"m-0 p-0 row col-12 col-md-4 d-flex align-items-center justify-content-evenly justify-content-md-end "+ (!(location.pathname==="/" || location.pathname==='/archive') ? "d-none" : "")}>
                <div className=" col-3 col-lg-2 p-0 dropdown">
                    <span className=" p-0 ps-3 nav-link dropdown-toggle text-light"  id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {tagSelected ? tagSelected :"Tag"}
                    </span>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><button className="dropdown-item" name="" onClick={handleTagClick}>Reset</button></li>
                        {[...tagSet].map((tag,idx)=>{
                            return <li key={idx}><button className="dropdown-item" name={tag}  onClick={handleTagClick}>{tag}</button></li>
                        })}
                        
                    </ul>
                </div>
                <div className="col-7 col-md-8 ">
                    <input onChange={handleSearchChange}  className=" h-25 form-control me-3 " type="search" placeholder="Search Notes..." aria-label="Search" />
                </div>

            </div>
        </nav>
        )

}

export default Navbar