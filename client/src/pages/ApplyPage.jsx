import React, { useState } from 'react'
import { useEffect } from 'react';
import ApplyForm from '../components/ApplyForm'
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

function ApplyPage() {
  const [proposal, setProposal] = useState(undefined)
  const {proposalId} = useParams()
  useEffect(() => {
    //TODO api call to fetch proposal
    console.log("useEffect")
    const fetchedProposal = {supervisor: {name: "Mario Rossi"}, title: "How to make a thesis management project", id: 12 }
    setProposal(fetchedProposal)
  }, [])

  console.log(proposal)
  return proposal == undefined ? (<></>):(
    <>
    <Header/>
    <NavBar/>
    <ApplyForm proposal={proposal}/>
    </>
  )
}

export default ApplyPage