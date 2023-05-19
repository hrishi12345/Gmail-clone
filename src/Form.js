

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Form.css';
import { login, signup } from './features/userSlice';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isLogin);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR1tfldY3tGoHgIHRJFEULd1C5XYv8kKQ';
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();

      if (isLogin) {
        console.log(data.email);
        dispatch(login({ token: data.idToken, email: data.email }));
      } else {
        console.log(data.email);
        dispatch(signup({ token: data.idToken, email: data.email }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      <div className="input-field">
        <label>Email address</label>
        <input type="email" placeholder="Enter email" value={email} onChange={emailHandler} />
        <small>We'll never share your email with anyone else.</small>
      </div>

      <div className="input-field">
        <label>Password</label>
        <input type="password" placeholder="Password" value={password} onChange={passwordHandler} />
      </div>

      <button className="button" type="submit">
        {isLogin ? 'Login' : 'Sign up'}
      </button>

      <button className="button" type="button" onClick={switchModeHandler}>
        {isLogin ? 'Create an account' : 'Already have an account'}
      </button>
    </form>
  );
};

export default AuthForm;
