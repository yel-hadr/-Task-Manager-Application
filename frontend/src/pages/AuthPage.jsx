import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
const AuthPage = () => {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  };
export default AuthPage;