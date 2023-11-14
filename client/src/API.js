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
        Description:e.description,
        Notes: e.notes,
        RequiredKnowledge: e.requiredKnowledge
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
        Description:e.description,
        Notes: e.notes,
        RequiredKnowledge: e.requiredKnowledge
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
        Description:e.description,
        Notes: e.notes,
        RequiredKnowledge: e.requiredKnowledge
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
        title:e.TITLE_DEGREE,
        cod:e.COD_DEGREE
      }));
    } else {
      throw cdsList;
    }
  }

  async function getAllTypes() {
    const response = await fetch(`${URL}proposals/types`); // Attendere che la Promise si risolva
    const typeList = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return typeList.map((e) => ({
        title:e,
      }));
    } else {
      throw typeList;
    }
  }

  async function getAllLevels() {
    const response = await fetch(`${URL}proposals/levels`); // Attendere che la Promise si risolva
    const levelList = await response.json(); // Attendere che la Promise si risolva
    if (response.ok) {
      return levelList.map((e) => ({
        title:e,
      }));
    } else {
      throw levelList;
    }
  }

  async function getProposalsByKeywords(keywords) {
    const response = await fetch(`${URL}proposals/keywords/${keywords}`); // Attendere che la Promise si risolva
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
  
  async function getProposalsByGroups(groups) {
    const response = await fetch(`${URL}proposals/groups/${groups}`); // Attendere che la Promise si risolva
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

  async function getProposalsByLevel(level) {
    const response = await fetch(`${URL}proposals/level/${level}`); // Attendere che la Promise si risolva
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

  async function getProposalsByCds(cds) {
    const response = await fetch(`${URL}proposals/cds/${cds}`); // Attendere che la Promise si risolva
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

  async function getProposalsByType(type) {
    const response = await fetch(`${URL}proposals/type/${type}`); // Attendere che la Promise si risolva
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
  

  const API = {getAllProposals, getProposalsByTitle, getProposalsByCosupervisor,getProposalsBySupervisor, getAllCds, getProposalsByKeywords, getProposalsByGroups, getAllTypes, getAllLevels, getProposalsByLevel, getProposalsByCds, getProposalsByType};
export default API;