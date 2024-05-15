import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();
  const redirect = () =>{
    navigate("/login");
  }

  const [Inputs, setInputs] = useState({email:"",username:"",password:""})

  const change = (e) =>{
    const {name,value} = e.target;
    setInputs({...Inputs , [name]:value})
  }

  const submit = async (e)=>{
    e.preventDefault();
    await axios.post('https://to-do-backend-pretisha.vercel.app/api/v1/register',Inputs)
    .then((response)=>{
      if(response.data.message==="Invalid"){
        toast.error("Invalid Credentials")
      }
      if(response.data.message==="Signup succesfull") {
        toast.success("Signup Successful")
        setInputs({email:"",username:"",password:""})
        setTimeout(redirect,2000);
      }
    })
  }


  return (
    <div className= "d-flex justify-content-center align-items-center vh-100 m-4"  >
      <ToastContainer />
      <form className="container my-4" style={{width:"35rem",backgroundColor:"white", padding:"8vh" ,borderRadius:"4%",border:"solid 2px grey"}} >
      <h1 className="h3 mb-3 fst-normal" style={{color:"grey"}}>Signup</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control "
            id="username"
            name="username"
            placeholder="Your Name"
            style={{background:"transparent",border:"none"}}
            onChange = {change}
            value={Inputs.username}
          />
          <hr />
          <label htmlFor="floatingInput">User Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control "
            id="email"
            name="email"
            placeholder="name@example.com"
            style={{background:"transparent",border:"none"}}
            onChange = {change}
            value={Inputs.email}
          />
          <hr />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            style={{background:"transparent", border:"none"}}
            onChange = {change}
            value ={Inputs.password}
          />
          <hr />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        
        <button className="btn btn-danger  w-100 py-2 my-3"   type="submit" onClick={submit}>
          Signup
        </button>
      </form>
    </div>
  )
}
