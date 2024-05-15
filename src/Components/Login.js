import React , { useState } from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import {authActions} from '../store/index'

export default function Login() {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const redirect = () =>{
    navigate("/todo");
  }

  const [Inputs, setInputs] = useState({email:"",username:"",password:""})

  const change = (e) =>{
    const {name,value} = e.target;
    setInputs({...Inputs , [name]:value})
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://to-do-backend-pretisha.vercel.app/api/v1/login', Inputs);
        if (response.data.message === "Invalid credentials") {
            toast.error("Invalid Credentials");
        } else if (response.data.message === "Please signup first") {
            toast.warning("Please Signup first");
        } else {
            console.log(response.data); 
            localStorage.setItem("id", response.data.id);
            dispatch(authActions.login())
            setInputs({ email: "", username: "", password: "" });
            setTimeout(redirect, 2000);
        }
    } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
    }
};



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ToastContainer />
      <form className="container mx-3 "  style={{ width: "32rem", backgroundColor:"white", padding:"6vh" ,borderRadius:"4%",border:"solid 2px grey"}}>
        <h1 className="h3 mb-3 fst-normal" style={{color:"grey"}}>Login</h1>
        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            style={{background:"transparent", border:"none"}}
            onChange = {change}
            value={Inputs.email}
          />
          <hr />
          <label htmlFor="floatingInput" >Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            style={{background:"transparent",border:"none"}}
            onChange = {change}
            value ={Inputs.password}
          />
          <hr />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-danger w-100 py-2 my-3"   type="submit" onClick={submit} >
          Login
        </button>
        <p> Don't have an account?
        <Link to="/signup">Signup Now!</Link>
        </p>
      </form>
    </div>
  )
}
