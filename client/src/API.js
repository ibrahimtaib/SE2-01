/* eslint-disable no-useless-catch */
import axios from 'axios';
import dayjs from 'dayjs';

const URL = 'http://localhost:3001/';

async function getAllProposals() {
    const response = await fetch(`${URL}proposals`); // Attendere che la Promise si risolva
    const proposals = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return proposals.map((e) => ({
        Supervisor:e.supervisor,
        Cds:e.cds,
        Teacher:e.supervisor,
        Title: e.title,
        CoSupervisor: e.coSupervisors,
        Expiration: dayjs(e.expiration).format('DD/MM/YYYY'),
        Groups:e.groups,
        Level:e.level,
        Type:e.type,
        Description:e.description,
        Notes: e.notes,
        RequiredKnowledge: e.requiredKnowledge
      }));
    } else {
      throw proposals;
    }
  }

  async function getProposalsByTitle(title) {
    const response = await fetch(`${URL}proposals/title/${title}`); // Attendere che la Promise si risolva
    const proposals = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return proposals.map((e) => ({
        Supervisor:e.supervisor,
        Cds:e.cds,
        Teacher:e.supervisor,
        Title: e.title,
        CoSupervisor: e.coSupervisors,
        Expiration: dayjs(e.expiration).format('DD/MM/YYYY'),
        Groups:e.groups,
        Level:e.level,
        Type:e.type,
        Description:e.description
      }));
    } else {
      throw proposals;
    }
  }

  async function getProposalsByCosupervisor(surname) {
    const response = await fetch(`${URL}proposals/cosupervisor/${surname}`); // Attendere che la Promise si risolva
    const proposals = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return proposals.map((e) => ({
        Supervisor:e.supervisor,
        Cds:e.cds,
        Teacher:e.supervisor,
        Title: e.title,
        CoSupervisor: e.coSupervisors,
        Expiration: dayjs(e.expiration).format('DD/MM/YYYY'),
        Groups:e.groups,
        Level:e.level,
        Type:e.type,
        Description:e.description
      }));
    } else {
      throw proposals;
    }
  }

  async function getProposalsBySupervisor(surname) {
    const response = await fetch(`${URL}proposals/supervisor/${surname}`); // Attendere che la Promise si risolva
    const proposals = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return proposals.map((e) => ({
        Supervisor:e.supervisor,
        Cds:e.cds,
        Teacher:e.supervisor,
        Title: e.title,
        CoSupervisor: e.coSupervisors,
        Expiration: dayjs(e.expiration).format('DD/MM/YYYY'),
        Groups:e.groups,
        Level:e.level,
        Type:e.type,
        Description:e.description
      }));
    } else {
      throw proposals;
    }
  }

  async function getAllCds() {
    const response = await fetch(`${URL}proposals/cds`); // Attendere che la Promise si risolva
    const cdsList = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return cdsList.map((e) => ({
        title:e,
      }));
    } else {
      throw cdsList;
    }
  }
  
  async function getApplicationsByTeacherId(teacherId) {
    const response = await fetch(`${URL}applications/${teacherId}`);
    const res = await response.json();
    if (response.ok) {
      return res;
    } else {
      throw 0;
    }
  }  
  
  async function getProposalById(proposalId) {
    const response = await fetch(`${URL}applications/proposal/${proposalId}`);
    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to fetch proposal');
    }
  }

  async function getExamAndStudentById(studentId) {
    try {
        const studentResponse = await fetch(`${URL}applications/student/${studentId}`);
        const studentData = await studentResponse.json();

        if (!studentResponse.ok) {
            throw new Error(studentData.error || 'Failed to fetch student information');
        }

        return {
            student: studentData,
        };
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
}


  const API = {getAllProposals, getProposalsByTitle, getProposalsByCosupervisor,getProposalsBySupervisor, getAllCds, getApplicationsByTeacherId, getProposalById, getExamAndStudentById};
export default API;