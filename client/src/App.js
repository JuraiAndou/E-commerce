import { Fragment, useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import { ToastContainer} from 'react-toastify';
import NavBar from './components/Layout/NaveBar';


import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link
} from "react-router-dom";
// Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import DashbordAdmin from './components/DashboardAdmin';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Categoria from './components/Categoria'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {
    /**
     * So you can keep track of authentication
     */
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    /**
     * Checks for authentication from the JWT
     */
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   * Administrator verification
   */
   const [isAdministrator, setIsAdmin] = useState(false)

   const setAdmin = boolean => {
     /**
      * So you can keep track of authentication
      */
     setIsAdmin(boolean)
   }
 
   async function isAdmin() {
     /**
      * Checks for authentication from the JWT
      */
     try {
       const response = await fetch('http://localhost:5000/auth/is-admin', {
         method: 'GET',
         headers: { token: localStorage.token }
       })
 
       const parseRes = await response.json()
 
       parseRes === true ? setIsAdmin(true) : setIsAdmin(false)
     } catch (err) {
       console.error(err.message);
     }
   }
 
   //Called evrery time is rendered
   useEffect(() => {
     isAuth()// So you can check for authentication on refresh
     isAdmin()// So you can check for priviledge on refresh
   })

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <NavBar isAuthenticated={isAuthenticated} isAdministrator={isAdministrator}/>
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={!isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to='/dashboard' />
            )} />
            <Route path='/register' element={!isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to='/login' />
            )} />
            <Route path='/dashboard' element={isAuthenticated ? (
              !isAdministrator ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <DashbordAdmin setAuth={setAuth} />
              )
            ) : (
              <Navigate to='/login' element={Home}/>
            )} />
            <Route path='/edit' element={isAuthenticated ? (
              <EditProfile setAuth={setAuth}/>
            ) : (
              <Navigate to='/login' />
            )}/>
            <Route path='/home' element={<Home isAdministrator={isAdministrator}/>}/>
            <Route path='/category' element= {<Categoria />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
