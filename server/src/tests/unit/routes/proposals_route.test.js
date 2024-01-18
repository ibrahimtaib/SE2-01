const request = require('supertest');
const express = require('express');
const proposalsRouter = require('../../../routes/proposals.js'); // Assicurati di fornire il percorso corretto al tuo router
const proposalsController = require('../../../controllers/proposals.js'); // Assicurati di fornire il percorso corretto al tuo controller

const app = express();
app.use(express.json());
app.use('/', proposalsRouter);

jest.mock('../../../controllers/proposals.js'); // Mock del controller

describe('Proposals Router', () => {
  it('should create a proposal', async () => {
    const mockProposalData = { /* inserisci qui i dati mockati per la creazione di una proposta */ };
    proposalsController.createProposal.mockResolvedValue(mockProposalData);

    const response = await request(app)
      .post('/')
      .send(mockProposalData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(proposalsController.createProposal).toHaveBeenCalledWith(mockProposalData);
    expect(response.body).toEqual(mockProposalData);
  });

  it('should get all CDs', async () => {
    const mockCdsList = [/* inserisci qui i dati mockati per la lista di CDs */ ];
    proposalsController.getAllCds.mockResolvedValue(mockCdsList);

    const response = await request(app)
      .get('/cds')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(proposalsController.getAllCds).toHaveBeenCalled();
    expect(response.body).toEqual(mockCdsList);
  });
});
describe('Proposals Router', () => {
    it('should get all types', async () => {
      const mockTypeList = [/* dati mockati per la lista di tipi */];
      proposalsController.getAllTypes.mockResolvedValue(mockTypeList);
  
      const response = await request(app)
        .get('/types')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getAllTypes).toHaveBeenCalled();
      expect(response.body).toEqual(mockTypeList);
    });
  

  
    it('should get all levels', async () => {
      const mockLevelList = [/* dati mockati per la lista di livelli */];
      proposalsController.getAllLevels.mockResolvedValue(mockLevelList);
  
      const response = await request(app)
        .get('/levels')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getAllLevels).toHaveBeenCalled();
      expect(response.body).toEqual(mockLevelList);
    });

  });

  describe('Proposals Router', () => {
    it('should get all proposals', async () => {
      const mockProposalList = [/* dati mockati per la lista di proposte */];
      proposalsController.getProposals.mockResolvedValue(mockProposalList);
  
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposals).toHaveBeenCalled();
      expect(response.body).toEqual(mockProposalList);
    });
  

  
    it('should get proposals by title', async () => {
      const searchString = 'example';
      const mockProposalListByTitle = [/* dati mockati per la lista di proposte filtrate per titolo */];
      proposalsController.getProposalsByTitle.mockResolvedValue(mockProposalListByTitle);
  
      const response = await request(app)
        .get(`/title/${searchString}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByTitle).toHaveBeenCalledWith(searchString);
      expect(response.body).toEqual(mockProposalListByTitle);
    });
  
    it('should handle get proposals by title error', async () => {
      const searchString = 'example';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByTitle.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/title/${searchString}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByTitle).toHaveBeenCalledWith(searchString);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe('Proposals Router', () => {
    it('should get proposals by cosupervisor', async () => {
      const cosupervisors = 'John Doe, Jane Smith';
      const mockProposalListByCosupervisor = [/* dati mockati per la lista di proposte filtrate per cosupervisori */];
      proposalsController.getProposalsByCosupervisor.mockResolvedValue(mockProposalListByCosupervisor);
  
      const response = await request(app)
        .get(`/cosupervisor/${cosupervisors}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByCosupervisor).toHaveBeenCalledWith(cosupervisors);
      expect(response.body).toEqual(mockProposalListByCosupervisor);
    });
  
    it('should handle get proposals by cosupervisor error', async () => {
      const cosupervisors = 'John Doe, Jane Smith';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByCosupervisor.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/cosupervisor/${cosupervisors}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByCosupervisor).toHaveBeenCalledWith(cosupervisors);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by supervisor', async () => {
      const nameOrSurname = 'John Doe';
      const mockProposalListBySupervisor = [/* dati mockati per la lista di proposte filtrate per supervisore */];
      proposalsController.getProposalsBySupervisor.mockResolvedValue(mockProposalListBySupervisor);
  
      const response = await request(app)
        .get(`/supervisor/${nameOrSurname}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsBySupervisor).toHaveBeenCalledWith(nameOrSurname);
      expect(response.body).toEqual(mockProposalListBySupervisor);
    });
  
    it('should handle get proposals by supervisor error', async () => {
      const nameOrSurname = 'John Doe';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsBySupervisor.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/supervisor/${nameOrSurname}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsBySupervisor).toHaveBeenCalledWith(nameOrSurname);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by keywords', async () => {
      const keywords = 'keyword1, keyword2';
      const mockProposalListByKeywords = [/* dati mockati per la lista di proposte filtrate per parole chiave */];
      proposalsController.getProposalsByKeywords.mockResolvedValue(mockProposalListByKeywords);
  
      const response = await request(app)
        .get(`/keywords/${keywords}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByKeywords).toHaveBeenCalledWith(keywords);
      expect(response.body).toEqual(mockProposalListByKeywords);
    });
  
    it('should handle get proposals by keywords error', async () => {
      const keywords = 'keyword1, keyword2';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByKeywords.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/keywords/${keywords}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByKeywords).toHaveBeenCalledWith(keywords);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe('Proposals Router', () => {
    it('should get proposals by cosupervisor', async () => {
      const cosupervisors = 'John Doe, Jane Smith';
      const mockProposalListByCosupervisor = [/* dati mockati per la lista di proposte filtrate per cosupervisori */];
      proposalsController.getProposalsByCosupervisor.mockResolvedValue(mockProposalListByCosupervisor);
  
      const response = await request(app)
        .get(`/cosupervisor/${cosupervisors}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByCosupervisor).toHaveBeenCalledWith(cosupervisors);
      expect(response.body).toEqual(mockProposalListByCosupervisor);
    });
  
    it('should handle get proposals by cosupervisor error', async () => {
      const cosupervisors = 'John Doe, Jane Smith';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByCosupervisor.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/cosupervisor/${cosupervisors}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByCosupervisor).toHaveBeenCalledWith(cosupervisors);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by supervisor', async () => {
      const nameOrSurname = 'John Doe';
      const mockProposalListBySupervisor = [/* dati mockati per la lista di proposte filtrate per supervisore */];
      proposalsController.getProposalsBySupervisor.mockResolvedValue(mockProposalListBySupervisor);
  
      const response = await request(app)
        .get(`/supervisor/${nameOrSurname}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsBySupervisor).toHaveBeenCalledWith(nameOrSurname);
      expect(response.body).toEqual(mockProposalListBySupervisor);
    });
  
    it('should handle get proposals by supervisor error', async () => {
      const nameOrSurname = 'John Doe';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsBySupervisor.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/supervisor/${nameOrSurname}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsBySupervisor).toHaveBeenCalledWith(nameOrSurname);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by keywords', async () => {
      const keywords = 'keyword1, keyword2';
      const mockProposalListByKeywords = [/* dati mockati per la lista di proposte filtrate per parole chiave */];
      proposalsController.getProposalsByKeywords.mockResolvedValue(mockProposalListByKeywords);
  
      const response = await request(app)
        .get(`/keywords/${keywords}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByKeywords).toHaveBeenCalledWith(keywords);
      expect(response.body).toEqual(mockProposalListByKeywords);
    });
  
    it('should handle get proposals by keywords error', async () => {
      const keywords = 'keyword1, keyword2';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByKeywords.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/keywords/${keywords}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByKeywords).toHaveBeenCalledWith(keywords);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe('Proposals Router', () => {
    it('should get proposals by groups', async () => {
      const groups = 'group1, group2';
      const mockProposalListByGroups = [/* dati mockati per la lista di proposte filtrate per gruppi */];
      proposalsController.getProposalsByGroups.mockResolvedValue(mockProposalListByGroups);
  
      const response = await request(app)
        .get(`/groups/${groups}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByGroups).toHaveBeenCalledWith(groups);
      expect(response.body).toEqual(mockProposalListByGroups);
    });
  
    it('should handle get proposals by groups error', async () => {
      const groups = 'group1, group2';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByGroups.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/groups/${groups}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByGroups).toHaveBeenCalledWith(groups);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by type', async () => {
      const type = 'exampleType';
      const mockProposalListByType = [/* dati mockati per la lista di proposte filtrate per tipo */];
      proposalsController.getProposalsByType.mockResolvedValue(mockProposalListByType);
  
      const response = await request(app)
        .get(`/type/${type}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByType).toHaveBeenCalledWith(type);
      expect(response.body).toEqual(mockProposalListByType);
    });
  
    it('should handle get proposals by type error', async () => {
      const type = 'exampleType';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByType.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/type/${type}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByType).toHaveBeenCalledWith(type);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by expiration date', async () => {
      const date = '2023-12-31';
      const mockProposalListByExpirationDate = [/* dati mockati per la lista di proposte filtrate per data di scadenza */];
      proposalsController.getProposalsByExpirationDate.mockResolvedValue(mockProposalListByExpirationDate);
  
      const response = await request(app)
        .get(`/expiration/${date}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByExpirationDate).toHaveBeenCalledWith(date);
      expect(response.body).toEqual(mockProposalListByExpirationDate);
    });
  
    it('should handle get proposals by expiration date error', async () => {
      const date = '2023-12-31';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByExpirationDate.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/expiration/${date}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByExpirationDate).toHaveBeenCalledWith(date);
      expect(response.body).toEqual({ error:"Internal Server Error"});
    });
  
    it('should get proposals by level', async () => {
      const level = 'exampleLevel';
      const mockProposalListByLevel = [/* dati mockati per la lista di proposte filtrate per livello */];
      proposalsController.getProposalsByLevel.mockResolvedValue(mockProposalListByLevel);
  
      const response = await request(app)
        .get(`/level/${level}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByLevel).toHaveBeenCalledWith(level);
      expect(response.body).toEqual(mockProposalListByLevel);
    });
  
    it('should handle get proposals by level error', async () => {
      const level = 'exampleLevel';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByLevel.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/level/${level}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByLevel).toHaveBeenCalledWith(level);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should get proposals by CDS', async () => {
      const cds = 'exampleCDS';
      const mockProposalListByCDS = [/* dati mockati per la lista di proposte filtrate per CDS */];
      proposalsController.getProposalsByCDS.mockResolvedValue(mockProposalListByCDS);
  
      const response = await request(app)
        .get(`/cds/${cds}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposalsByCDS).toHaveBeenCalledWith(cds);
      expect(response.body).toEqual(mockProposalListByCDS);
    });
  
    it('should handle get proposals by CDS error', async () => {
      const cds = 'exampleCDS';
      const mockError = new Error("Internal Server Error");
      proposalsController.getProposalsByCDS.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/cds/${cds}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposalsByCDS).toHaveBeenCalledWith(cds);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });

  describe('Proposals Router', () => {
    it('should get teacher proposals by teacherId', async () => {
      const teacherId = 'exampleTeacherId';
      const mockTeacherProposals = [/* dati mockati per la lista di proposte filtrate per teacherId */];
      proposalsController.getTeacherProposals.mockResolvedValue(mockTeacherProposals);
  
      const response = await request(app)
        .get(`/teacher/${teacherId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getTeacherProposals).toHaveBeenCalledWith(teacherId);
      expect(response.body).toEqual(mockTeacherProposals);
    });
  
    it('should handle get teacher proposals by teacherId error', async () => {
      const teacherId = 'exampleTeacherId';
      const mockError = new Error("Internal Server Error");
      proposalsController.getTeacherProposals.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/teacher/${teacherId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getTeacherProposals).toHaveBeenCalledWith(teacherId);
      expect(response.body).toEqual({ error: "Internal Server Error"});
    });
  
    it('should filter proposals based on provided filters', async () => {
      const mockFilters = {/* dati mockati per i filtri delle proposte */};
      const mockFilteredProposals = [/* dati mockati per la lista di proposte filtrate */];
      proposalsController.filterProposals.mockResolvedValue(mockFilteredProposals);
  
      const response = await request(app)
        .post('/filter')
        .send({ filters: mockFilters })
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.filterProposals).toHaveBeenCalledWith(mockFilters);
      expect(response.body).toEqual(mockFilteredProposals);
    });
  
    it('should handle filter proposals error', async () => {
      const mockFilters = {/* dati mockati per i filtri delle proposte */};
      const mockError = new Error("Internal Server Error");
      proposalsController.filterProposals.mockRejectedValue(mockError);
  
      const response = await request(app)
        .post('/filter')
        .send({ filters: mockFilters })
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.filterProposals).toHaveBeenCalledWith(mockFilters);
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should update a proposal', async () => {
      const mockUpdatedProposal = {/* dati mockati per la proposta aggiornata */};
      proposalsController.updateProposal.mockResolvedValue(mockUpdatedProposal);
  
      const response = await request(app)
        .post('/update')
        .send({ /* dati mockati per la proposta da aggiornare */ })
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.updateProposal).toHaveBeenCalled();
      expect(response.body).toEqual(mockUpdatedProposal);
    });
  
    it('should handle update proposal error', async () => {
      const mockError = new Error("Internal Server Error");
      proposalsController.updateProposal.mockRejectedValue(mockError);
  
      const response = await request(app)
        .post('/update')
        .send({ /* dati mockati per la proposta da aggiornare */ })
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.updateProposal).toHaveBeenCalled();
    });
  });

  describe('Proposals Router', () => {
    it('should handle createProposal error and return 500 status', async () => {
      const mockError = new Error('Failed to create proposal');
      proposalsController.createProposal.mockRejectedValue(mockError);
  
      const response = await request(app)
        .post('/')
        .send({ /* dati mockati per la proposta da creare */ })
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.createProposal).toHaveBeenCalled();
      expect(response.body).toEqual({ error: 'Failed to create proposal' });
    });
  
    it('should handle getAllCds error and return 500 status', async () => {
      const mockError = new Error('Failed to get all CDs');
      proposalsController.getAllCds.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get('/cds')
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getAllCds).toHaveBeenCalled();
      expect(response.body).toEqual({ error: 'Failed to get all CDs' });
    });
  
    it('should handle getAllTypes error and return 500 status', async () => {
      const mockError = new Error('Failed to get all types');
      proposalsController.getAllTypes.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get('/types')
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getAllTypes).toHaveBeenCalled();
      expect(response.body).toEqual({ error: 'Failed to get all types' });
    });
  
    it('should handle getAllLevels error and return 500 status', async () => {
      const mockError = new Error('Failed to get all levels');
      proposalsController.getAllLevels.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get('/levels')
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getAllLevels).toHaveBeenCalled();
      expect(response.body).toEqual({ error: 'Failed to get all levels' });
    });
  
    it('should handle getProposals error and return 500 status', async () => {
      const mockError = new Error('Failed to get proposals');
      proposalsController.getProposals.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.getProposals).toHaveBeenCalled();
      expect(response.body).toEqual({ error: 'Failed to get proposals' });
    });
  });
  describe('Proposals Router', () => {
  
    it('should archive expired proposals', async () => {
      // Mock data for the successful case
      const mockedUpdatedProposals = [/* mocked data for updated proposals */];
      proposalsController.archiveExpiredProposals.mockResolvedValue(mockedUpdatedProposals);
  
      const response = await request(app)
        .get('/archiveExpiredProposals')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.archiveExpiredProposals).toHaveBeenCalled();
      expect(response.body).toEqual(mockedUpdatedProposals);
    });
  
    it('should handle archive expired proposals error', async () => {
      // Mock the controller to simulate an error
      const mockError = new Error("Internal Server Error");
      proposalsController.archiveExpiredProposals.mockRejectedValue(mockError);
  
      const response = await request(app)
        .get('/archiveExpiredProposals')
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(proposalsController.archiveExpiredProposals).toHaveBeenCalled();
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  
    it('should archive a proposal by ID', async () => {
      // Mock data for the successful case
      const proposalId = 1;
      const mockedUpdatedProposal = {/* mocked data for updated proposal */};
      proposalsController.archiveProposal.mockResolvedValue(mockedUpdatedProposal);
    
      const response = await request(app)
        .get(`/archiveProposal/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    
      // Convert proposalId to a number before asserting
      expect(proposalsController.archiveProposal).toHaveBeenCalledWith(parseInt(proposalId, 10));
      expect(response.body).toEqual(mockedUpdatedProposal);
    });
    
    it('should handle archive proposal by ID error', async () => {
      // Mock data for the error case
      const proposalId = 1;
      const mockError = new Error("Internal Server Error");
      proposalsController.archiveProposal.mockRejectedValue(mockError);
    
      const response = await request(app)
        .get(`/archiveProposal/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(500);
    
      // Convert proposalId to a number before asserting
      expect(proposalsController.archiveProposal).toHaveBeenCalledWith(parseInt(proposalId, 10));
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
    
    
  });

  

  