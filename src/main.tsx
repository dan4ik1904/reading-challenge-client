import React from "react"
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import App from "./App.jsx"
import "./css/global.css"
import { store } from './services/store.js'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
      
 </React.StrictMode>               
)


