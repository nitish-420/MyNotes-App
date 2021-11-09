import React,{useState,useContext} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import noteContext from "../context/notes/noteContext"


function AddNote(props){
    
    const context=useContext(noteContext);
    const {addNote}=context;

    const [data,setData]=useState(
        {
            title:"",
            description:"",
            tag:""
        }
    )

    const [expand,setExpand]=useState(false)
    
    function handleChange(event){
        const {name,value}=event.target
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    function clicked(event){
        event.preventDefault()
        // setExpand(true)
        let finalData={
            title:data.title.trim(),
            description:data.description.trim(),
            tag:data.tag.trim()
        }
        if(!finalData.description.length){
            props.showAlert("Please Enter a valid Note","danger")
        }
        else{
            if(!finalData.title){
                finalData.title="Important"
            }
            
            if(!finalData.tag){
                finalData.tag="Self"
            }

            // console.log(finalData)
            
            addNote(finalData)
            // props.showAlert("New note is created","success")
            setData({
                title:"",
                description:"",
                tag:""
            })
            setExpand(false)
        }
    }
    

    document.addEventListener('click',(event)=>{
        if(!event.target.classList.contains("noteStateToggle")){
            setExpand(false)
        }
        
    })


    return (
        <div   className="row m-auto mb-4">
            <form  className="col-11 col-sm-10 col-md-8 row container m-auto addNoteArea bg-dark noteStateToggle">
                <div className={"noteStateToggle  col-8 col-md-7 pb-3 "+ (expand ? "" : "d-none")}>
                    <input className="form-control noteStateToggle" type="text" onChange={handleChange} name="title" onKeyDown={(event)=>event.key==="Enter" && event.preventDefault() } placeholder= "Title"  value={data.title} maxLength="100"/>
                </div>
                <div className={"noteStateToggle col-md-3 pb-3 col-4 "+ (expand ? "" : "d-none")}>
                    <input className="form-control noteStateToggle" type="text" onChange={handleChange} name="tag" onKeyDown={(event)=>event.key==="Enter" && event.preventDefault() } placeholder="Tag" value={data.tag} maxLength="10"/>
                </div>

                <div className={"noteStateToggle col-sm-12 col-md-10 mb-3 "+ (expand ? "" : "col-md-12")}>
                    <textarea className="form-control noteStateToggle" onClick={()=>setExpand(true)} type="text" onChange={handleChange} name="description" placeholder={expand ? "Add note here" : "Click here to add a note"} value={data.description} maxLength="1000" rows={expand ? "2" : "1"}/>
                </div>
                <div className={" noteStateToggle col-12  col-md-2 mt-0 float-end "+ (expand ? "" : " d-none")}>
                    <Fab className="float-end float-md-none" onClick={clicked}>
                        <AddIcon />
                    </Fab>
                </div>
            </form>
        </div>
    )
};

export default AddNote