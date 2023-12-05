/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


import FilterProposals from '../components/FilterProposals';

function MainPage({ProposalsList, setProposalsList, user, setUpdate, setProposalToInsert, refetchDynamicContent}) {
  return (   
        <>
        {user !== null ?(
          <>
          <Container fluid className="App p-0">
          <FilterProposals user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} setUpdate={setUpdate} setProposalToInsert={setProposalToInsert} refetchDynamicContent={refetchDynamicContent}/>
          </Container>
        </>
        ):(
          
          //redirect to login page
          <></>
        )
      }
      </>
  )
}

export default MainPage