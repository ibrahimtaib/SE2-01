import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import ApplyForm from '../components/ApplyForm';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

function ApplyPage() {
  const [proposal, setProposal] = useState(undefined)
  const {proposalId} = useParams()
  useEffect(() => {
    const fetchProposal = async ()=> {
      const response = await API.getProposalById(proposalId)
      console.log("getProposalById", response.proposal)
      const fetchedProposal = {...response.proposal, supervisor: response.proposal.teacher}
      setProposal(fetchedProposal)
    }
    fetchProposal();
  }, [])

  return proposal == undefined ? (<></>):(
    <>
    <Header/>
    <NavBar/>
    <ApplyForm proposal={proposal}/>
    </>
  )
}

export default ApplyPage