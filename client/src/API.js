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
        Description:e.description
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

  async function getAllCds() {
    const response = await fetch(`${URL}proposals/cds`); // Attendere che la Promise si risolva
    const cdsList = await response.json(); // Attendere che la Promise si risolva
    console.log(cdsList)
    if (response.ok) {
      return cdsList.map((e) => ({
        title:e,
      }));
    } else {
      throw cdsList;
    }
  }
  
  

  const API = {getAllProposals, getProposalsByTitle, getProposalsByCosupervisor, getAllCds};
export default API;