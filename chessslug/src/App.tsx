import React, { useEffect, useState, createContext, useRef } from 'react';


import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Sidebar from './Components/Navbar/Sidebar';
import { getAuthToken, request } from './axios_helper';
export const UserLoggedInContext = createContext(false);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    if (getAuthToken()) {
      request("GET", "/gameState/all").then((response) => {
        setLoggedIn(true);
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [])

  const handleSetLoggedIn = () => {
    setLoggedIn(!isLoggedIn);
  }

  return (
    <div className="App" style={{ height: "100%", display: "flex", }}>
      <BrowserRouter>
        <UserLoggedInContext.Provider value={isLoggedIn}>

            <Sidebar handleSetLoggedIn={handleSetLoggedIn} />
            <Routes>

              <Route index element={<Home />} />

              <Route path="*" element={<> error 404</>} />

            </Routes>

        </UserLoggedInContext.Provider>

      </BrowserRouter>

    </div>
  );
}

export default App;
