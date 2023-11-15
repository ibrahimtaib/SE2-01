import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import "react-datetime/css/react-datetime.css";
import "@yaireo/tagify/dist/tagify.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InsertPage from './pages/InsertPage';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false)


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<InsertPage isLoggedIn={isLoggedIn} />}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
