import React, { useContext,useState,useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
// import AddAlertIcon from '@mui/icons-material/AddAlert';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import noteContext from "../context/notes/noteContext"

function NoteItem(props) {

    const { note } = props
    const triggerCloseViewFULL=useRef(null)
    const triggerCloseUpdate=useRef(null)
    const viewFullTrigger=useRef(null)

    const context = useContext(noteContext);
    const { delNote ,updateNote,archiveToggle,pinToggle} = context;

    const [updated,setUpdatedData]=useState(note)
    
    function handleChange(event){
        const {name,value}=event.target
        setUpdatedData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    const updateClicked=()=>{
        const finalToUpdate={
            ...updated,
            title:updated.title.trim(),
            description:updated.description.trim(),
            tag:updated.tag.trim()
        }

        if(!finalToUpdate.description){
            props.showAlert("Description can't be empty","danger")
            setUpdatedData(note)
        }
        else{
            if(!finalToUpdate.title){
                finalToUpdate.title="Important"
            }
            if(!finalToUpdate.tag){
                finalToUpdate.tag="Self"
            }
            // console.log(finalToUpdate)
            updateNote(finalToUpdate)
            props.showAlert("Updated a note", "success")

        }
        
    }

    const clickedFullView=()=>{
        triggerCloseViewFULL.current.click();
        navigator.clipboard.writeText(note.description)
        //above line will copy the content 
        props.showAlert("Copied to clipboard", "success")
    }


    return (
        <div className="note card mx-2 my-4 " >
            <span className={"pinIcon bg-dark  "+ (!note.pinned ? "text-light" :"")} onClick={()=>pinToggle(note)}>
                <PushPinIcon/>
            </span>
            <span className="badge bg-dark">{note.tag}</span>
            <h5 className="card-header headingBox " onClick={()=>viewFullTrigger.current.click()} style={{ backgroundColor: "white", color: "black" }}>{note.title}</h5>
            <div className="card-body bg-dark" >
                <div className="card-text" >
                    <div className="shortNote " onClick={()=>viewFullTrigger.current.click()}>
                        {note.description}
                    </div>
                    <p className="m-0 h6 fst-italic" style={{fontSize:"15px"}}>Last Mod - {note.date}</p>
                    <div className=" mt-2 d-flex flex-row justify-content-between align-items-center flex-nowrap">
                        <button ref={viewFullTrigger} type="button" className="btn btn-light  d-none" data-bs-toggle="modal" data-bs-target={`#id${note._id}`} onClick={()=>props.showAlert("Viewing in full mode","success")}>
                            <FullscreenIcon/>
                        </button>
                        <button type="button" className="btn btn-light " data-bs-toggle="modal" data-bs-target={`#update${note._id}`} >
                            <EditIcon />
                        </button>
                        <button className="btn btn-light" onClick={() => delNote(note._id)}>
                            <DeleteIcon />
                        </button>
                        {!note.archived ? <button className="btn btn-light " onClick={() => archiveToggle(note)}>
                            <ArchiveIcon />
                        </button> :
                        <button className="btn btn-light " onClick={() => archiveToggle(note)}>
                            <UnarchiveIcon />
                        </button>}

                    </div>
                    
                </div>


            </div>

            <div className="modal fade " id={`id${note._id}`} tabIndex="-1" aria-labelledby={`id${note._id}Label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className="modal-content bg-dark ">
                        <div className="modal-header ">
                            <h5 className="modal-title text-light " id={`id${note._id}Label`}>Full View</h5>
                            <button type="button" className="btn-close btn-close-white"  data-bs-dismiss="modal" aria-label="Close" onClick={() => props.showAlert("Exiting full mode", "success")}></button>
                        </div>
                        <div className="modal-body">
                            <form className="m-auto ">
                                <div className="pb-3">
                                    <textarea className="form-control bg-light" type="text" name="title" value={note.title} readOnly/>
                                </div>
                                <div className="pb-3">
                                    <input className="form-control bg-light" type="text" name="tag" value={note.tag} readOnly/>
                                </div>
                                <div className="">
                                    <textarea className="form-control bg-light " style={{height:"45vh"}} type="text" name="description"  value={note.description} readOnly/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer d-flex flex-row justify-content-between align-items-center flex-nowrap">
                            <button ref={triggerCloseViewFULL} type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => props.showAlert("Exiting full mode", "success")}>Close</button>
                            <button type="button" className="btn btn-light" onClick={() => { clickedFullView() }}>Copy Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`update${note._id}`} tabIndex="-1" aria-labelledby={`update${note._id}Label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title text-light" id={`update${note._id}Label`} >Update Form</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.showAlert("Exiting full mode", "danger")}></button>
                        </div>
                        <div className="modal-body ">
                            <form className="m-auto ">
                                <div className="pb-3">
                                    <textarea className="form-control" type="text" onChange={handleChange} name="title" onKeyDown={(event)=>event.key==="Enter" && event.preventDefault() } placeholder="Updated note title" value={updated.title} maxLength="100"/>
                                </div>
                                <div className="pb-3">
                                    <input className="form-control" type="text" onChange={handleChange} name="tag" onKeyDown={(event)=>event.key==="Enter" && event.preventDefault() } placeholder="Updated tag" value={updated.tag} maxLength="10"/>
                                </div>
                                <div className="">
                                    <textarea className="form-control " style={{height:"50vh"}} type="text" onChange={handleChange} name="description" placeholder="Updated description" value={updated.description} maxLength="1000"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer d-flex flex-row justify-content-between align-items-center flex-nowrap">
                            <button ref={triggerCloseUpdate} type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => props.showAlert("Exiting without updating", "danger")}>Cancel</button>
                            <button type="button" className="btn btn-light " data-bs-dismiss="modal" onClick={() => { updateClicked() }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NoteItem
