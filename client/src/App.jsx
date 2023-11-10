import './App.css'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import InsertPage from './pages/InsertPage';
import ApplicationsList from './components/BrowseApplications'
import ProposalDetails from './components/ProposalDetails';


const fakeData = [
  {
    student: {
      "id": 123,
      "surname": "Rossi",
      "name": "Mario",
      "gender": "M",
      "nationality": "Italian",
      "email": "mario.rossi@studenti.unimi.it",
      "COD_DEGREE": "LM-18",
      "ENROLLMENT_YEAR": 2020,
      "degree": {
        "COD_DEGREE": "LM-18",
        "TITLE_DEGREE": "Computer Science"
      },
      "Career": [
        {
          "courseId": 1,
          "COD_COURSE": "MAT/02",
          "TITLE_COURSE": "Mathematical Analysis",
          "CFU": 9,
          "grade": 30,
          "date": 20200115
        },
        {
          "courseId": 2,
          "COD_COURSE": "MAT/03",
          "TITLE_COURSE": "Geometry",
          "CFU": 9,
          "grade": 27,
          "date": 20200201
        },
        {
          "courseId": 3,
          "COD_COURSE": "MAT/04",
          "TITLE_COURSE": "Algebra",
          "CFU": 6,
          "grade": 28,
          "date": 20200315
        },
        {
          "courseId": 4,
          "COD_COURSE": "PHYS/01",
          "TITLE_COURSE": "Physics",
          "CFU": 8,
          "grade": 25,
          "date": 20200401
        },
        {
          "courseId": 5,
          "COD_COURSE": "INF/01",
          "TITLE_COURSE": "Programming",
          "CFU": 12,
          "grade": 28,
          "date": 20200515
        },
        {
          "courseId": 6,
          "COD_COURSE": "CHEM/01",
          "TITLE_COURSE": "Chemistry",
          "CFU": 7,
          "grade": 26,
          "date": 20200601
        },
        {
          "courseId": 7,
          "COD_COURSE": "BIO/01",
          "TITLE_COURSE": "Biology",
          "CFU": 10,
          "grade": 29,
          "date": 20200715
        },
        {
          "courseId": 8,
          "COD_COURSE": "ENG/01",
          "TITLE_COURSE": "English",
          "CFU": 5,
          "grade": 24,
          "date": 20200801
        },
        {
          "courseId": 9,
          "COD_COURSE": "ART/01",
          "TITLE_COURSE": "Art",
          "CFU": 8,
          "grade": 27,
          "date": 20200915
        },
        {
          "courseId": 10,
          "COD_COURSE": "HIST/01",
          "TITLE_COURSE": "History",
          "CFU": 9,
          "grade": 26,
          "date": 20201001
        }
      ]
    },
    proposal: {
      "id": 456,
      "title": "Development of a web application for project management",
      "supervisor": 789,
      "coSupervisors": "Anna Verdi",
      "keywords": ["web development", "project management", "database"],
      "type": "Master's Thesis",
      "groups": ["Computer Science", "Computer Engineering"],
      "description": "The goal of this thesis is to design and implement a web application for managing company projects, tracking activities, deadlines, roles, and resources involved. The application should be developed using the Django framework and the PostgreSQL database, following the principles of the MVC model and responsive design.",
      "notes": "A good knowledge of the Python language, Django framework, and PostgreSQL database is required. It is also required to follow good development practices, document the code, and perform quality testing.",
      "expiration": 20231231,
      "level": "LM",
      "cds": "LM-18",
      "teacher": {
        "id": 789,
        "surname": "Neri",
        "name": "Luca",
        "email": "luca.neri@unimi.it",
        "COD_GROUP": "INF",
        "COD_DEPARTMENT": "Department of Computer Science"
      },
      "requiredKnowledge": "Python, Django, PostgreSQL, HTML, CSS, JavaScript"
    }
  },
  {
    student: {
      "id": 124,
      "surname": "Galli",
      "name": "Sara",
      "gender": "F",
      "nationality": "Italian",
      "email": "sara.galli@studenti.unimi.it",
      "COD_DEGREE": "LM-40",
      "ENROLLMENT_YEAR": 2019,
      "degree": {
        "COD_DEGREE": "LM-40",
        "TITLE_DEGREE": "Mathematics"
      },
      "Career": [
        {
          "courseId": 222,
          "COD_COURSE": "MAT/02",
          "TITLE_COURSE": "Mathematical Analysis",
          "CFU": 9,
          "grade": 30,
          "date": 20200115
        },
        {
          "courseId": 111,
          "COD_COURSE": "MAT/03",
          "TITLE_COURSE": "Geometry",
          "CFU": 9,
          "grade": 27,
          "date": 20200201
        }
      ]
    },
    proposal: {
      "id": 457,
      "title": "Study of a class of nonlinear differential equations",
      "supervisor": 790,
      "coSupervisors": "Marco Bianchi",
      "keywords": ["differential equations", "nonlinear analysis", "numerical methods"],
      "type": "Master's Thesis",
      "groups": ["Mathematics", "Physics"],
      "description": "The aim of this thesis is to study a class of nonlinear differential equations that model complex physical phenomena, such as gravity waves, solitary waves, and turbulence. The existence, uniqueness, and stability of solutions will be analyzed using tools from functional analysis and spectral theory. Numerical methods will also be implemented for the approximate solution of equations, comparing the results with theoretical ones.",
      "notes": "A good knowledge of differential equations theory, functional analysis, and numerical methods is required. It is also required to use MATLAB software for the computational part.",
      "expiration": 20230630,
      "level": "LM",
      "cds": "LM-40",
      "teacher": {
        "id": 790,
        "surname": "Rossi",
        "name": "Elena",
        "email": "elena.rossi@unimi.it",
        "COD_GROUP": "MAT",
        "COD_DEPARTMENT": "Department of Mathematics"
      },
      "requiredKnowledge": "Differential equations, Functional analysis, Spectral theory, Numerical methods, MATLAB"
    }
  }
]



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
    <>
      <Routes>
        <Route path="/" element={<ApplicationsList data={fakeData} />} />
        <Route path="/proposal/:id" element={<ProposalDetails />} />
      </Routes>
    </>
  );
}

export default App
