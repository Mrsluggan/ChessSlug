import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Components/Header/Header';
import LoginForm from './Components/LoginForm/LoginForm';
import { request, getAuthToken, setAuthToken } from './axios_helper'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Shop from './Pages/Shop';
import Home from './Pages/Home';
import Board from './Pages/Chessboard/Board';
import Navbar from './Components/Navbar/Navbar';
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



function App() {
  return (
    <div className="App" style={{ height: "100%", display: "flex",}}>
      <BrowserRouter>
      <Sidebar />
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
