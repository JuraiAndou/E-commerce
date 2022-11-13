import { Fragment, useEffect, useState } from 'react';
import './App.css';

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
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json()

      parseRes == true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
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
    </Fragment>
  );
}

export default App;
