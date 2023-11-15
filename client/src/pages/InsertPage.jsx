/* eslint-disable react/prop-types */
import Header from '../components/Header';
import InsertForm from '../components/InsertForm';
import NavBar from '../components/Navbar';


function InsertPage({isLoggedIn}) {

  return (
    <>
    <Header isLoggedIn={isLoggedIn}/>
    <NavBar></NavBar>
    <br></br>
    <InsertForm />
    <br></br>
    </>
  )
}

export default InsertPage;