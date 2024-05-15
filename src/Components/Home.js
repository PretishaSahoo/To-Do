import React from 'react'
import { useNavigate } from "react-router-dom";
import img from '../Images/img.png'

export default function Home() {

  const navigate = useNavigate();
  const redirect = () =>{
    navigate("/todo");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column text-center p-2">
          <img src={img} alt="list" style={{height:"38vh" , paddingTop:"100px"}}/>
        <h1 style = {{fontSize:"75px"}} >Organize your <br/>work and life easily</h1>
        <p  style = {{fontSize:"20px"}} >Become focused , manage Tasks easily and stay calm and organized with <br/> Our ToDo App!!!</p>
        <button type="button" className="btn btn-danger mx-1 p-3" onClick={redirect} > Make your ToDo List now !hurry!!</button>
        </div>
    </div>
  )
}
