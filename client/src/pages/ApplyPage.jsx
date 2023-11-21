import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import ApplyForm from '../components/ApplyForm';

function ApplyPage() {
  //TODO: Have some kind of method that checks (in the database, then returns an error) if a user has already applied to a proposal
  //TODO: Fix user showing after login
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
    <ApplyForm proposal={proposal}/>
  )
}

export default ApplyPage