/* eslint-disable react/prop-types */
import Header from '../components/Header';
import InsertForm from '../components/InsertForm';


function InsertPage({isLoggedIn}) {

  return (
    <>
    <Header isLoggedIn={isLoggedIn}/>
    <InsertForm />
    </>
  )
}

export default InsertPage;