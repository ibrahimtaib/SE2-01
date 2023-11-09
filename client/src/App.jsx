import './App.css'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import InsertPage from './pages/InsertPage';


function App() {


  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

function Main() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<InsertPage />}/>
    </Routes>
  )


}

export default App
