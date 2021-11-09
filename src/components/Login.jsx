import React,{useState,useContext} from "react"
import {useHistory} from 'react-router-dom'
import noteContext from "../context/notes/noteContext"

function Login(props) {

    let history=useHistory();

    const context = useContext(noteContext);
    const { getNotes} = context;


    const [data,setData]=useState(
        {
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
        event.preventDefault()
        let email=data.email.trim()
        let password=data.password.trim()
        if(!validateEmail(email)){
            props.showAlert("Please enter a valid email","danger")
        }
        else if(password.length<5){
            props.showAlert("Invalid credentials","danger")

        }
        else{
            const response=await fetch("https://mynotes-backend-nitish.herokuapp.com/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });
            const json=await response.json()
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                await getNotes()
                props.showAlert("Welcome back","success")
                history.push("/");
            }
            else{
                props.showAlert("Invalid credentials","danger")
            }
        }

        
    }

    const goTOSignUp=()=>{
        history.push("/signup")
    }


    return (
        <div className="container">

            <div className=" row">
                <div className=" col-sm-10 col-md-8 container bg-dark text-muted">
                    <form className="container row  mx-auto">
                        <h1 className="mb-2 mt-2  col-8 mx-auto text-center text-white">Login page</h1>
                        <div className="  mx-auto">
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" onChange={handleChange} name="email" className="form-control" id="email" value={data.email} aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-2 ">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" onChange={handleChange} name="password" className="form-control" value={data.password} id="password"/>
                            </div>
                        </div>
                        <div className=" m-auto row">
                            <button type="submit" onClick={clicked} className="btn btn-light col-5 mx-auto mt-3">Login</button>
                        </div>
                    </form>
                    <div className="container mt-0 mx-auto my-auto row">
                        <div className="col-12 text-center  my-2"><p className="my-0">OR</p></div>
                        <div className="mb-3  m-auto row">
                            <button type="submit" onClick={goTOSignUp} className="btn btn-light  col-5 mx-auto">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login