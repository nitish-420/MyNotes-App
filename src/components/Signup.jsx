import React,{useState,useContext} from "react"
import noteContext from "../context/notes/noteContext"


import {useHistory} from 'react-router-dom'

function Signup(props){

    let history=useHistory();

    const context = useContext(noteContext);
    const { getNotes} = context;


    const [data,setData]=useState(
        {
            name:"",
            email:"",
            password:""
        }
    )
    
    function handleChange(event){
        const {name,value}=event.target
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const clicked=async (event)=>{
        try{
            event.preventDefault()
            let name=data.name.trim()
            let email=data.email.trim()
            let password=data.password.trim()
            if(name.length<3){
                props.showAlert("Name should be atleast three characters","danger")
                
            }
            else if(!validateEmail(email)){
                props.showAlert("Please enter a valid email","danger")
            }
            else if(password.length<5){
                props.showAlert("Password should be atleast 5 characters","danger")
    
            }
            else{
                const response=await fetch("https://mynotes-backend-nitish.herokuapp.com/api/auth/createuser",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({name,email,password})
                });
                const json=await response.json()
                if(json.success){
                    localStorage.setItem('token',json.authtoken)
                    await getNotes()
                    props.showAlert("Signed Up successfully","success")
                    history.push("/");
                }
                else{
                    props.showAlert("Invalid credentials","danger")
                }
            }

        }catch(e){
            props.showAlert("Something went wrong","danger")
            console.log(e)
        }
        
    }



    return (
        <div className="container">
            <div className=" row">
                <div className=" col-sm-10 col-md-8 mx-auto bg-dark text-muted">
                    <h1 className="text-center mt-1 text-white">Sign Up Page</h1>
                    <form className="container">
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" onChange={handleChange} className="form-control" name="name" id="name" aria-describedby="fullName" value={data.name}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" value={data.email}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" onChange={handleChange} className="form-control" id="password" name="password" value={data.password}/>
                        </div>
                        <div className="mb-3 row mx-auto">
                            <button type="submit" onClick={clicked} className="btn  mt-3 btn-light col-5 mx-auto">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup