import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './Pages/Home';
import Sidebar from './Components/Navbar/Sidebar';


function App() {
  return (
    <div className="App" style={{ height: "100%", display: "flex", }}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<> error 404</>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
