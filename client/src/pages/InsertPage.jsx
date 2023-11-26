/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import 'tailwindcss/tailwind.css';

import InsertForm from '../components/InsertForm';

function InsertPage({user}) {

  return (
    <InsertForm user={user}/>
  )
}

export default InsertPage;