import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ApplyPage from './pages/ApplyPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="proposals/:proposalId/apply" element={<ApplyPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App