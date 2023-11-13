import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ApplicationsList from './components/BrowseApplications';
import ProposalDetails from './components/ProposalDetails';
import './App.css';
import StudentDetails from './components/StudentDetails';
import API from './API';  

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

function Main() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsData = await API.getApplicationsByTeacherId();  
        setApplications(applicationsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <Header />
      <NavBar />
      
      <Routes>
        <Route path="/applications/"  element={<ApplicationsList data={applications} />} />
        <Route path="/applications/proposal/:id" element={<ProposalDetails />} />
        <Route path="/applications/student/:id" element={<StudentDetails />} />
      </Routes>
    </>
  );
}

export default App;
