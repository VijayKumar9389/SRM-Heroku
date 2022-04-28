import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { SiCivicrm } from "react-icons/si";
import './Login.css';

const Login = ({ LogIn }) => {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post('https://tritonsrm-api.herokuapp.com/api/auth/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response)
      if (response.data.auth) {
        LogIn(response.data);
        console.log(response)
        localStorage.setItem("x-access-token", response.data.token);
      } else {
        setMessage(response.data.message);
      }
    });
  }

  return (
    <div className="login-page">
      <div id="login-image-container">
        <h1>Stakeholder Relation Manager</h1>
        <SiCivicrm size='5rem' />
      </div>
      <div id="login-container">
        <div id="login-heading-wrapper">
          <h2>LOG IN</h2>
          <p id='login-message'>{message}</p>
        </div>
        <div className="inputs">
          <h1>{data.NAME}</h1>
          <label>Username (JohnDoe)</label>
          <input onChange={(e) => setUsername(e.target.value)} defaultValue='JohnDoe'></input>
        </div>
        <div className="inputs">
          <label>Password (Password123)</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} defaultValue='Password123'></input>
        </div>
        <button id="login-btn" onClick={login}>Log In</button>
      </div>
    </div>
  );
}

export default Login;
