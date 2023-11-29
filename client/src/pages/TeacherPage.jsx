import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


import TeacherProposals from '../components/TeacherProposals';

function TeacherPage(props) {
  return (   
        <>
        {props.user !== null ?(
          <>
          <Container fluid className="App p-0">
          <TeacherProposals user={props.user} ProposalsList={props.ProposalsList} setProposalsList={props.setProposalsList}/>
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

export default TeacherPage