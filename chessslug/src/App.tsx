import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Components/Header/Header';
import LoginForm from './Components/LoginForm/LoginForm';
import { request } from './axios_helper'

const handleRegister = (firstName: string, lastName: string, username: string, password: string) => {
  request("POST", "/register", JSON.stringify({ firstName, lastName, username, password })).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
};

const handleLogin = (username: string, password: string) => {
  request("POST", "/login", JSON.stringify({ username, password })).then((data) => {
    console.log(data);

  }).catch((error) => {
    console.log(error);
  })
};

function App() {
  return (
    <div className="App">
      <Header />
      <LoginForm onRegister={handleRegister} onLogin={handleLogin} />
    </div>
  );
}

export default App;
