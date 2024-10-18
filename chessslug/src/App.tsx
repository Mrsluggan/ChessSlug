import React, { useState, ChangeEvent, FormEvent } from 'react';

import { request, setAuthToken } from './axios_helper'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Board from './Pages/Chessboard/Board';
import Sidebar from './Components/Navbar/Sidebar';

const handleRegister = (firstName: string, lastName: string, login: string, password: string) => {
  request("POST", "/register", JSON.stringify({ firstName, lastName, login, password })).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
    setAuthToken("");
  })
};

const handleLogin = (login: string, password: string) => {
  request("POST", "/login", JSON.stringify({ login, password })).then((response) => {
    console.log(response);
    setAuthToken(response.data?.token);
  }).catch((error) => {
    console.log(error);
    setAuthToken("");
  })
};

const loginButton = () => {
  handleLogin("123", "123")
}


function App() {
  return (
    <div className="App" style={{ height: "100%", display: "flex", }}>
      <BrowserRouter>
        <Sidebar />
        <button onClick={loginButton}>Logga in</button>
        <Routes>
          <Route index element={<Home />} />
          <Route path="board" element={<Board />} />
          <Route path="*" element={<> error 404</>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
