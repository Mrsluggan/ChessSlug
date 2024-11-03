import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './Pages/Home';
import Sidebar from './Components/Navbar/Sidebar';
import { getAuthToken, request } from './axios_helper';
import Shop from './Pages/Shop';
import Learn from './Pages/Learn';
import Header from './Components/Header/Header';

export const UserLoggedInContext = createContext(false);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      request("GET", "/gameState/all").then(() => {
        setLoggedIn(true);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const handleSetLoggedIn = () => {
    setLoggedIn(!isLoggedIn);
  };

  return (
    <div className="App" style={{ height: "100%", display: "flex" }}>
      <UserLoggedInContext.Provider value={isLoggedIn}>
        <BrowserRouter>
          <Sidebar handleSetLoggedIn={handleSetLoggedIn} />
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home handleSetLoggedIn={handleSetLoggedIn} />} />
              <Route path="/store" element={<Shop />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="*" element={<div>error 404</div>} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserLoggedInContext.Provider>
    </div>
  );
}
export default App;
