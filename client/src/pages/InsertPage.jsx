/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';

import Header from '../components/Header';
import InsertForm2 from '../components/InsertForm2';
import NavBar from '../components/Navbar';


function InsertPage({isLoggedIn}) {

  return (
    <>
    <Header/>
    <NavBar/>
    <InsertForm2 />
    </>
  )
}

export default InsertPage;