import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import API from '../API';
import api from '../utils/pi'
import ApplyForm from '../components/ApplyForm';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const undefinedProposalError = "Sorry, an error happened while fetching the proposal. Please try again later or verify that the proposal exists."
const alreadyAppliedError = "Sorry, you have already applied to this proposal. You can only apply once per proposal."
const errorFetchingApplication = "Sorry, an error happened while fetching your application. Please try again later."

function ApplyPage() {
  //TODO: Have some kind of method that checks (in the database, then returns an error) if a user has already applied to a proposal
  //TODO: Fix user showing after login
  const [proposal, setProposal] = useState(undefined)
  const [application, setApplication] = useState(undefined) 
  const {proposalId} = useParams()
  const studentId = 1 //TODO: Get student id from user

  useEffect(() => {
    const fetchProposal = async ()=> {
      const response = await API.getProposalById(proposalId)
      const application = await api.getApplication(studentId, proposalId)
      setApplication(application)
      console.log("getProposalById", response.proposal)
      const fetchedProposal = {...response.proposal, supervisor: response.proposal.teacher}
      setProposal(fetchedProposal)
    }
    fetchProposal();
  }, [])

  if (proposal === undefined) {
    return <LoadingPage/>
  }
  if (application === undefined) {
    return <ErrorPage errorTitle="500" errorMessage={errorFetchingApplication} />
  }
  if (application !== null) {
    return <ErrorPage errorTitle="Sorry, something went wrong!" errorMessage={alreadyAppliedError} />
  }
  return (
    <ApplyForm proposal={proposal} studentId={studentId} />
  )

}

export default ApplyPage