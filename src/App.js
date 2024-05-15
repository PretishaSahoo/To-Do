import React from 'react';
import './App.css';
import About from './Components/About';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {authActions} from './store'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('id')){
      try {
        dispatch(authActions.login());
      } catch (error) {
        console.error('Error during login dispatch:', error);
      }
    }
    
  }, [dispatch])
  
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/todo" element={<Todo/>} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
