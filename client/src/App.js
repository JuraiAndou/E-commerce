import { Fragment, useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
// Components
import Dashbord from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

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

  useEffect(() => {
    isAuth()// So you can check for authentication on refresh
  })

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/login' element={!isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to='/dashbord' />
            )} />
            <Route path='/register' element={!isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to='/login' />
            )} />
            <Route path='/dashbord' element={isAuthenticated ? (
              <Dashbord setAuth={setAuth} />
            ) : (
              <Navigate to='/login' />
            )} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
