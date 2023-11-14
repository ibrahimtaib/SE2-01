import React, { useState } from 'react'
import { useEffect } from 'react';
import ApplyForm from './ApplyForm'
// import Header from './Header';
// import NavBar from './NavBar';

function ApplyPage({proposalId}) {
  const [proposal, setProposal] = useState(null)
  useEffect(() => {
    //TODO api call to fetch proposal
    console.log("useEffect")
    const fetchedProposal = {supervisor: {name: "Mario Rossi"}, title: "How to make a thesis management project", id: 12 }
    setProposal(fetchedProposal)
  }, [])

  console.log(proposal)
  return proposal == null ? (<></>):(
    <>
    {/* <Header/>
    <NavBar/> */}
    <ApplyForm proposal={proposal}/>
    </>
  )
}

export default ApplyPage