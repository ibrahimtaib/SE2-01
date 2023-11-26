import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import API from '../API';
import ApplicationsList from '../components/BrowseApplications';
import ProposalDetails from '../components/ProposalDetails';


function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
              const applicationsData = await API.getApplicationsByTeacherId(1);  
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
        <Route path="/" element={<ApplicationsList applications={applications} loading={loading} setLoading={setLoading}/>} />
        <Route path="/proposal/:id" element={<ProposalDetails />} />
      </Routes>
    </>
  )
}

export default ApplicationsPage