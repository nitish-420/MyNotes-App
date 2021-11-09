import React ,{useState,useEffect} from "react";

import NoteContext from "./noteContext";

const NoteState=(props)=>{
	
	const url="https://mynotes-backend-nitish.herokuapp.com/api/notes"

    const [notes, setNotes] = useState([])
	const [pinnedNotes,setPinnedNotes]=useState([])
	
	// this is to fetch all notes of a particular user from the api and token name we will give later by ourself 
	const getNotes=async ()=>{
		try{
			const allNotes= await fetch(`${url}/fetchallnotes`,{
				method:"GET",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				}
			})
			const json=await allNotes.json()
			json.reverse()
			// console.log(json)
			setNotes(json);
			return 
		}
		catch(e){
			return e;
		}
	}

	//this is to fetch all pinned notes
	const getPinnedNotes=async ()=>{
		try{
			const allNotes= await fetch(`${url}/fetchpinnednotes`,{
				method:"GET",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				}
			})
			const json=await allNotes.json()
			json.reverse()
			// console.log(json)
			setPinnedNotes(json);
			return 
		}
		catch(e){
			return e;
		}
	}
	
	// this is used to delete a note from api
	const delNote=async(id)=>{
		try{
			const res=await fetch(`${url}/deletenote/${id}`,{
				method:"DELETE",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				}
			})
			const json=await res.json()
			if(!json.success){
				props.showAlert("Something went wrong","danger")
				return
			}
			const finalNote=notes.filter((note)=> note._id!==id)
			const finalPinnedNotes=pinnedNotes.filter((note)=> note._id!==id)
			
			setNotes(finalNote)
			setPinnedNotes(finalPinnedNotes)
			props.showAlert("Deleted a note","danger")
		}
		catch(error){
			// console.log(error.message)
			props.showAlert("Something went wrong","danger")
		}
	}
	
	// this is used to add a note to api
	const addNote=async(newNote)=>{
		try{
			const note= await fetch(`${url}/addnote`,{
				method:"POST",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				},
				body:JSON.stringify(newNote)
			})
			const json=await note.json()
			if(json.error){
				props.showAlert("Something went wrong","danger")
				return json.error
			}
			const newNotes=[json,...notes]
			setNotes(newNotes);
			props.showAlert("Added a note","success")
			
		}catch(error){
			// console.log(error.message)
			props.showAlert("Something went wrong","danger")
		}
		
	}


	// this is used to update a note to api
	const updateNote=async (newNote)=>{
		try{
			newNote.date=new Date().toLocaleString();
			const updatedNote=await fetch(`${url}/updatenote/${newNote._id}`,{
				method:"PUT",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				},
				body:JSON.stringify(newNote)
			})
			const json=await updatedNote.json()
			const toupdate=json.note;
			if(toupdate.pinned){

				let newPinnedNotes=[...pinnedNotes]
				for(let i=0;i<newPinnedNotes.length;i++){
					if(newPinnedNotes[i]._id===toupdate._id){
						newPinnedNotes[i]={...toupdate};
						break;
					}
				}
				setPinnedNotes(newPinnedNotes)
			}
			else{

				let newNotes=[...notes]
				for(let i=0;i<newNotes.length;i++){
					if(newNotes[i]._id===toupdate._id){
						newNotes[i]={...toupdate};
						break;
					}
				}
				setNotes(newNotes)
			}
			
			props.showAlert("Updated a note","success")
			
		}catch(error){
			// console.log(error.message)
			props.showAlert("Something went wrong","danger")
		}
		
	}
	
	const archiveToggle=async(note)=>{
		try{
			let newNote={...note}
			if(note.archived){
				newNote.archived=false;
			}
			else{
				newNote.archived=true;
			}
			const updatedNote=await fetch(`${url}/updatenote/${newNote._id}`,{
				method:"PUT",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				},
				body:JSON.stringify(newNote)
			})
			const json=await updatedNote.json()
			const toupdate=json.note;
			// console.log(toupdate)
			if(toupdate.pinned){

				let newPinnedNotes=[...pinnedNotes]
				for(let i=0;i<newPinnedNotes.length;i++){
					if(newPinnedNotes[i]._id===toupdate._id){
						newPinnedNotes[i]={...toupdate};
						break;
					}
				}
				setPinnedNotes(newPinnedNotes)
			}
			else{

				let newNotes=[...notes]
				for(let i=0;i<newNotes.length;i++){
					if(newNotes[i]._id===toupdate._id){
						newNotes[i]={...toupdate};
						break;
					}
				}
				setNotes(newNotes)
			}

			if(!note.archived){
				props.showAlert("Archived a note, to see click on MyNotes","success")
			}
			else{
				props.showAlert("Unarchived a note","success")
			}
			
		}catch(error){
			// console.log(error.message)
			props.showAlert("Something went wrong","danger")
		}

	}

	const pinToggle=async(note)=>{
		try{
			let newNote={...note}
			if(note.pinned){
				newNote.pinned=false;
			}
			else{
				newNote.pinned=true;
			}
			const updatedNote=await fetch(`${url}/updatepinnednote/${newNote._id}`,{
				method:"PUT",
				headers:{
					'Content-Type':'application/json',
					'auth-token':localStorage.getItem("token")
				},
				body:JSON.stringify(newNote)
			})
			const json=await updatedNote.json()
			const toupdate=json.note;
			// console.log(toupdate)
			if(!note.pinned){
				const newNotes=notes.filter((note)=>{
					return note._id!==toupdate._id;
				})
				setNotes(newNotes);

				const newPinnedNotes=[toupdate,...pinnedNotes]
				setPinnedNotes(newPinnedNotes);
				props.showAlert("Pinned a note","success")

			}
			else{
				const newPinnedNotes=pinnedNotes.filter((note)=>{
					return note._id!==toupdate._id
				})
				setPinnedNotes(newPinnedNotes)

				const newNotes=[toupdate,...notes]
				setNotes(newNotes)
				props.showAlert("Unpinned a note","success")
			}
			
		}catch(error){
			// console.log(error.message)
			props.showAlert("Something went wrong","danger")
		}

	}

	useEffect(()=>{
		getNotes();
		getPinnedNotes();
	},[])
	
	
    return (
		<NoteContext.Provider value={{notes,getNotes,setNotes,delNote,addNote,updateNote,archiveToggle,pinToggle,pinnedNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState