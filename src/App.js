import { Route, Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import './App.css';

import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get('https://tritonsrm.com/api/auth/login').then((response) => {
      if (response.data.auth) {
        LogIn(response.data.auth);
      }
    });
  }, [loggedIn]);

  function LogIn(Auth) {;
    setLoggedIn(Auth);
  }

  function Logout() {
    Axios.get('https://tritonsrm.com/api/auth/logout');
    setLoggedIn(false);
  }

  if (!loggedIn)
    return <Login LogIn={obj => LogIn(obj)} />

  return (
      <div className='app-container'>
          <Routes>
              <Route path='/' element={<Home Logout={Logout}/>} />
              <Route path='/:name' element={<Profile Logout={Logout}/>} />
          </Routes>
      </div>
  );
}

export default App;
