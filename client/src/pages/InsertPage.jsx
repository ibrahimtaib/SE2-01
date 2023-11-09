import { useState } from 'react'
import Header from '../components/Header';
import InsertForm from '../components/InsertForm';


function InsertPage() {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <>
    <Header></Header>
    <InsertForm />
    </>
  )
}

export default InsertPage;