import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import ApplyForm from './ApplyForm'

function ApplyPage({proposalId}) {
  const [proposal, setProposal] = useState(null)
  useEffect(() => {
    //TODO api call to fetch proposal
    console.log("useEffect")
    const fetchedProposal = {supervisor: {name: "Mario Rossi"}, title: "How to make a thesis management project" }
    setProposal(fetchedProposal)
  }, [])
  console.log(proposal)
  return proposal == null ? (<></>):(
    <ApplyForm proposal={proposal}/>
  )
}

export default ApplyPage