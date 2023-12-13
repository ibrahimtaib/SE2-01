const request = require('supertest');
const express = require('express');
const proposalsRouter = require('../../../routes/proposals.js'); // Assicurati di fornire il percorso corretto al tuo router
const proposalsController = require('../../../controllers/proposals.js'); // Assicurati di fornire il percorso corretto al tuo controller

const app = express();
app.use(express.json());
app.use('/', proposalsRouter);

jest.mock('../../../controllers/proposals.js'); // Mock del controller

describe('Proposals Router', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // Test create proposal endpoint
    it('should create a proposal', async () => {
      const mockProposalData = {/* Mock proposal data here */};
      proposalsController.createProposal.mockResolvedValue(mockProposalData);
  
      const response = await request(app)
        .post('/')
        .send(mockProposalData)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.createProposal).toHaveBeenCalledWith(mockProposalData);
      expect(response.body).toEqual(mockProposalData);
    });
  
    // Test get all CDs endpoint
    it('should get all CDs', async () => {
      const mockCdsList = [/* Mock CD data here */];
      proposalsController.getAllCds.mockResolvedValue(mockCdsList);
  
      const response = await request(app)
        .get('/cds')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getAllCds).toHaveBeenCalled();
      expect(response.body).toEqual(mockCdsList);
    });
  
    // Test get all types endpoint
    it('should get all types', async () => {
      const mockTypeList = [/* Mock type data here */];
      proposalsController.getAllTypes.mockResolvedValue(mockTypeList);
  
      const response = await request(app)
        .get('/types')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getAllTypes).toHaveBeenCalled();
      expect(response.body).toEqual(mockTypeList);
    });
  
    // Test get all levels endpoint
    it('should get all levels', async () => {
      const mockLevelList = [/* Mock level data here */];
      proposalsController.getAllLevels.mockResolvedValue(mockLevelList);
  
      const response = await request(app)
        .get('/levels')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getAllLevels).toHaveBeenCalled();
      expect(response.body).toEqual(mockLevelList);
    });
  
    // Test get all proposals endpoint
    it('should get all proposals', async () => {
      const mockProposalList = [/* Mock proposal data here */];
      proposalsController.getProposals.mockResolvedValue(mockProposalList);
  
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(proposalsController.getProposals).toHaveBeenCalled();
      expect(response.body).toEqual(mockProposalList);
    });
  
    // Add more tests for other endpoints...
  
  });
  