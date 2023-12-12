/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import API from '../API';
import ApplicationsList from '../components/BrowseApplications';


function ApplicationsPage_secretary({user}) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

  const handleAcceptThesisRequestsBySecretary = async (requestId) => {
    try {
      await API.AcceptThesisRequestsBySecretary(requestId);
      const updatedApplications = await API.getPendingThesisRequests();
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error accepting thesis by "+ user.role, error);
    }
  };


  const handleRejectThesisRequestsBySecretary = async (requestId) => {
    try {
      await API.RejectThesisRequestsBySecretary(requestId);
      const updatedApplications = await API.getPendingThesisRequests();
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error rejecting thesis by "+ user.role, error);
    }
  };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const applicationsData = user.role=='teacher'? await API.getSerecatryAcceptedThesisRequestsByTeacherId(user.id): await API.getPendingThesisRequests();
              setApplications(applicationsData);
              setLoading(false);
            } catch (error) {
              console.error(error);
            }
        }
        fetchData();
    }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationsList
              applications={applications}
              loading={loading}
              setLoading={setLoading}
              onAccept={handleAcceptThesisRequestsBySecretary}
              onReject={handleRejectThesisRequestsBySecretary}
              user={user}
              isRequest={true}
            />
          }
        />
        {/*TODO: add a Route for the ThesisDetails component*/}
      </Routes>
    </>
  );
}

export default ApplicationsPage_secretary;