import React, { useEffect, useState } from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Sidebar from './Components/Navbar/Sidebar';
import { getAuthToken, request } from './axios_helper';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const handleSetLoggedIn = () => {
    setLoggedIn(!isLoggedIn); 
  } 
  
  
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


  return (
    <div className="App" style={{ height: "100%", display: "flex", }}>
      <BrowserRouter>
        <Sidebar handleSetLoggedIn={handleSetLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          {isLoggedIn && (
            <>
              <Route index element={<Home />} />
            </>
          )}
          <Route path="*" element={<> error 404</>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
