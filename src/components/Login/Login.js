import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import { setUserSession } from '../../Utils/Common';

function Login(props) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  const username = useFormInput('')
  const password = useFormInput('');

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3000/api/auth/users/signin', { username: username.value, password: password.value })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        navigate('/addInvoice', { replace: true })
      }).catch(error => {
      console.log(error)
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }



  return (
    <div className="login-wrapper">
      <h1>Esegui l'accesso per modificare le fatture</h1>
        <label>
          <p>Username</p>
          <input className="input-text" type="text" {...username} autoComplete="new-password" />
        </label>
        <label>
          <p>Password</p>
          <input className="input-text" type="password" {...password} autoComplete="new-password" />
        </label>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <div>
          <input  className="input-button" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />

        </div>

    </div>
  )

}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}


export default Login;
