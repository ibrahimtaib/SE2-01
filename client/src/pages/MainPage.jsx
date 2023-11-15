/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


import FilterProposals from '../components/FilterProposals';
import Header from '../components/Header';
import NavBar from '../components/Navbar';

function MainPage(props) {
  return (
        <>
          <Header/>
          <NavBar/>
          <Container fluid className="App p-0">
          <FilterProposals ProposalsList={props.ProposalsList} setProposalsList={props.setProposalsList}/>
          </Container>
        </>
  )
}

export default MainPage