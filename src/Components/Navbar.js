import React from 'react';
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css'; 

export default function Navbar() {
    const dispatch = useDispatch();
    const isloggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('id');
        dispatch(authActions.logout());
        setTimeout(() => {
            toast.success("Logged out Successfully!");
        }, 1000);
        redirectToHome();
    }

    const redirectToHome = () => {
        navigate("/");
    }

    const redirectToSignup = () => {
        navigate("/signup");
    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><b style={{ color: 'red' }}><GiNotebook />TODO</b></Link>
                    <button className="navbar-toggler navbar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-light p-2" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            {!isloggedIn && <>
                                <button type="button" className="btn btn-danger mx-1" onClick={redirectToLogin}>Login</button>
                                <button type="button" className="btn btn-danger mx-1" onClick={redirectToSignup}>Signup</button>
                            </>
                            }
                            {isloggedIn &&
                                <button type="button" className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </div>
    )
}
