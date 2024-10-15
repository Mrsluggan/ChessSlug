import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Components/Header/Header';
import LoginForm from './Components/LoginForm/LoginForm';
import { request, getAuthToken, setAuthToken } from './axios_helper'

const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
  request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
};

const handleLogin = (login: string, password: string) => {
  request("POST", "/login", JSON.stringify({ login, password })).then((response) => {
    console.log(response);
    setAuthToken(response.data?.token);
  }).catch((error) => {
    console.log(error);
  })
};

function App() {
  return (
    <div className="App">
      <Header />
      <LoginForm handleRegister={handleRegister} handleLogin={handleLogin} />
    </div>
  );
}

export default App;
