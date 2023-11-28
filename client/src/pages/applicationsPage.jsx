/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import API from '../API';
import ApplicationsList from '../components/BrowseApplications';
import ProposalDetails from '../components/ProposalDetails';


function ApplicationsPage({user}) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

  const handleAcceptApplication = async (applicationId) => {
    try {
      // Implementa la logica per l'accettazione dell'applicazione
      await API.acceptApplication(applicationId);
      // Aggiorna la lista delle applicazioni dopo l'accettazione
      const updatedApplications = await API.getApplicationsByTeacherId(1);
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error accepting application", error);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      // Implementa la logica per il rifiuto dell'applicazione
      await API.refuseApplication(applicationId);
      // Aggiorna la lista delle applicazioni dopo il rifiuto
      const updatedApplications = await API.getApplicationsByTeacherId(1);
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error rejecting application", error);
    }
  };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const applicationsData = await API.getApplicationsByTeacherId(user.id);  
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
              onAccept={handleAcceptApplication}
              onReject={handleRejectApplication}
            />
          }
        />
        <Route path="/proposal/:id" element={<ProposalDetails />} />
      </Routes>
    </>
  );
}

export default ApplicationsPage;