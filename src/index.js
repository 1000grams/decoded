<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js"; // Updated to include .js extension

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css'; // Import global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
  </React.StrictMode>
);
