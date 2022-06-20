import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/apiSlice';
import AuthContext from '../../context/AuthContext';
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);


  const handleChangeEmailOrPassword = (e) => {
    setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const [login] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    login(credentials)
      .unwrap()
      .then((data) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/")
      })
      .catch((error) => dispatch({ type: "LOGIN_FAILURE", payload: error }))
  }


  return (
    <div className="login">
      <div className="lContainer">
        <input type="text" placeholder="Email" name='email' onChange={handleChangeEmailOrPassword} className='lInput' />
        <input type="password" placeholder="password" name='password' onChange={handleChangeEmailOrPassword} className='lInput' />
        <button disabled={loading} onClick={handleSubmit} className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )

}

export default Login;