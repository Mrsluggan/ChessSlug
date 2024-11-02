import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

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
      <Router>
        <UserLoggedInContext.Provider value={isLoggedIn}>
          <Sidebar handleSetLoggedIn={handleSetLoggedIn} />
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Header />
            <Routes>
              <Route index element={<Home handleSetLoggedIn={handleSetLoggedIn} />} />
              <Route path="/store" element={<Shop />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="*" element={<> error 404</>} />
            </Routes>
          </div>
        </UserLoggedInContext.Provider>
      </Router>
    </div>
  );
}

export default App;
