import { createRoot } from 'react-dom/client'
import React from "react";
import App from "./App.jsx";
import "./css/global.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
 </React.StrictMode>               
)


