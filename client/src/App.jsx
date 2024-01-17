/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "@yaireo/tagify/dist/tagify.css";
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import API from './API';
import CallbackLogin from "./components/CallbackLogin";
import DefaultRoute from './components/DefaultRoute';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ApplyPage from './pages/ApplyPage';
import InsertPage from './pages/InsertPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from "./pages/LogoutPage";
import MainPage from './pages/MainPage';
import StudentApplicationsPage from './pages/StudentApplicationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faker } from '@faker-js/faker';


import './App.css';


import api,{ getUserInfo } from "./api/api";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentRequestPage from "./pages/StudentRequestPage";
import ThesisRequestsPage from "./pages/ThesisRequestsPage";
import ApplicationsPage from "./pages/applicationsPage";

function App() {

  const proposalStateMock = {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    expiration: "2024-12-31",
    degree: {
      COD_DEGREE: "0"
    },
    level: "Master",
    type: "Experimental",
    coSupervisors: ["s654321@polito.it", "externalsup@polito.it"],
    requiredKnowledge: "sample",
    keywords: ["keywordsample"],
  };

  const getDegrees = () => {
    api.get('/degrees')
        .then((response) => {
          if (response.data.length > 0) {
            const firstDegree = response.data[0];
            proposalStateMock.degree=response.data[0];
        }
        }
        )
}
getDegrees();

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [dirty, setDirty] = useState(false);
  //This is the proposal to send to InsertForm
  const [proposalToInsert, setProposalToInsert] = useState(proposalStateMock);
  const [ProposalsList, setProposalsList] = useState([]);

  const refetchDynamicContentTeacher = async (teacherId) => {
    API.getTeacherProposals(teacherId).then((proposals) => setProposalsList(proposals));
  }

  const resetProposal = () => {
    setProposalToInsert(proposalStateMock);
    setUpdate(false);
  }

  useEffect(() => {
    const init = async () => {

      try {
        const userInfo = await getUserInfo();
        setLoggedIn(true);
        setUser(userInfo);
        if (userInfo && userInfo.role === "teacher") {
          API.archiveExpiredProposals().then((expiredProposals) => console.log(expiredProposals));
          const teacherId = userInfo.id;
          const proposals = await API.getTeacherProposals(teacherId);
          setProposalsList(proposals);
          setLoading(false);
        } else if (userInfo && userInfo.role === "student") {
          API.archiveExpiredProposals().then((expiredProposals) => console.log(expiredProposals));
          const proposals = await API.getProposalsByCds(userInfo.cds);
          setProposalsList(proposals);
          setLoading(false);
        } else if(userInfo && userInfo.role === "coSupervisor"){
          API.archiveExpiredProposals().then((expiredProposals) => console.log(expiredProposals));
          const coSupervisorId = userInfo.email
          const proposals = await API.getProposalsByCosupervisor(coSupervisorId);
          setProposalsList(proposals);
          setLoading(false);
        }
        setDirty(false);
      } catch (error) {
        console.error("Error in init:", error);
        setLoggedIn(false);
        setUser(null);
        setLoading(false);
      }
    };
    init();
    console.log(proposalToInsert.degree.COD_DEGREE);
  }, [loggedIn, update, proposalToInsert.degree.COD_DEGREE, dirty]);

  if (!loggedIn && loading) {
    return (<LoadingSpinner />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoading={setLoading} />} />
        <Route path="/" element={<HeaderPage user={user} resetProposal={resetProposal} setDirty={setDirty} />}>
          <Route path="/*" element={<DefaultRoute />} />
          <Route path="/idp/profile/SAML2/Redirect" element={<CallbackLogin setUser={setUser} />} />
          <Route
            path="/"
            element={
              loggedIn ? user?.role === "secretary" ? (
                <ThesisRequestsPage user={user} />
              ):(
                <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} setUpdate={setUpdate} setProposalToInsert={setProposalToInsert} refetchDynamicContent={refetchDynamicContentTeacher} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/logout"
            element={
              loggedIn ? (
                <LogoutPage setUser={setUser} setLoggedIn={setLoggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {user?.role === "student" ? (
            <>
              <Route path="/student/applications" element={<StudentApplicationsPage user={user} />} />
              <Route path="/student/requestForm" element={loggedIn ? (<StudentRequestPage user={user} />) : (<Navigate to="/login" />)}></Route>
              <Route path="/students/:id" element={loggedIn ? (<StudentDetailsPage />) : (
                <Navigate to="/login" />
              )} />
              <Route
                path="/proposals/:proposalId/apply"
                element={
                  loggedIn ? (
                    <ApplyPage user={user} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </>
          ):(
            <>
              <Route path="/add" element={<InsertPage refetchDynamicContent={refetchDynamicContentTeacher} user={user} loading={loading} update={update} setLoading={setLoading} proposalToInsert={proposalToInsert} />} />
              <Route path="/applications/*" element={<ApplicationsPage user={user} setDirty={setDirty} />} />
              <Route path="/students/:id" element={<StudentDetailsPage />} />
              <Route path="thesis-requests/*" element={<ThesisRequestsPage user={user} />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

function HeaderPage({ user, resetProposal, setDirty }) {
  return (
    <>
      <Header />
      <NavBar user={user} resetProposal={resetProposal} setDirty={setDirty} />
      <Outlet />
    </>
  )
}

export default App