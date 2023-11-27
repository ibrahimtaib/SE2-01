const request = require('supertest');
const express = require('express');
const router = require('../../../routes/applications.js');

const applicationsController = require('../../../controllers/applications.js');
const applicationController = require('../../../controllers/application.js');


jest.mock('../../../controllers/applications.js');
jest.mock('../../../controllers/application.js');


const app = express();
app.use(express.json());
app.use(router);

describe('POST /', () => {
    it('should create a new application', async () => {
      // Dati di esempio per il test
      const mockRequestBody = {
        // ... Inserisci qui i dati del corpo della richiesta che ti aspetti
      };
      const mockApplication = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire il risultato
      };
  
      // Mock del controller per simulare la creazione di un'applicazione
      applicationController.createApplication = jest.fn().mockResolvedValue(mockApplication);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post('/')
        .send(mockRequestBody)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con il corpo della richiesta corretto
      expect(applicationController.createApplication).toHaveBeenCalledWith(mockRequestBody);
  
      // Verifica la risposta del server
      expect(response.body).toEqual(mockApplication);
    });
  
    it('should handle errors when creating a new application', async () => {
      // Dati di esempio per il test
      const mockRequestBody = {
        // ... Inserisci qui i dati del corpo della richiesta che ti aspetti
      };
      const mockError = new Error("Internal Server Error");
  
      // Mock del controller per simulare un errore nella creazione di un'applicazione
      applicationController.createApplication = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post('/')
        .send(mockRequestBody)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con il corpo della richiesta corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationController.createApplication).toHaveBeenCalledWith(mockRequestBody);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({});
    });
  });
  
describe('GET /:teacherId/', () => {
    it('should get applications for a teacher', async () => {
      const teacherId = '123'; 
      const mockApplicationsData = [
        
      ];

      applicationsController.getApplicationsStudentsProposalsDegreesByTeacherId = jest.fn().mockResolvedValue(mockApplicationsData);
  
      const response = await request(app)
        .get(`/${teacherId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(applicationsController.getApplicationsStudentsProposalsDegreesByTeacherId).toHaveBeenCalledWith(teacherId);
      expect(response.body).toEqual(mockApplicationsData);
    });
  
    it('should handle errors when getting applications for a teacher', async () => {
      const teacherId = '123'; 
      const mockError = new Error("Internal Server Error");
  
      applicationsController.getApplicationsStudentsProposalsDegreesByTeacherId = jest.fn().mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/${teacherId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(applicationsController.getApplicationsStudentsProposalsDegreesByTeacherId).toHaveBeenCalledWith(teacherId);
  
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
});

describe('GET /proposal/:proposalId/student/:studentId', () => {
    it('should get student application for a valid proposal and student id', async () => {
      const proposalId = '123'; 
      const studentId = '456'; 
      const mockApplicationsData = [
      ];
  
      applicationController.getStudentApplication = jest.fn().mockResolvedValue(mockApplicationsData);
  
      const response = await request(app)
        .get(`/proposal/${proposalId}/student/${studentId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(applicationController.getStudentApplication).toHaveBeenCalledWith({
        PROPOSAL_ID: +proposalId,
        STUDENT_ID: +studentId,
      });
  
      expect(response.body).toEqual(mockApplicationsData);
    });
  
    it('should handle errors when getting student application', async () => {
      const proposalId = '123'; 
      const studentId = '456';
      const mockError = new Error('Failed to get student application');

      applicationController.getStudentApplication = jest.fn().mockRejectedValue(mockError);
  
      const response = await request(app)
        .get(`/proposal/${proposalId}/student/${studentId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      expect(applicationController.getStudentApplication).toHaveBeenCalledWith({
        PROPOSAL_ID: +proposalId,
        STUDENT_ID: +studentId,
      });
  
    });
  
    it('should handle invalid proposal or student id', async () => {
      const response = await request(app)
        .get('/proposal/invalid/student/invalid')
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(response.body).toEqual({ error: 'Invalid proposal or student id' });
    });
});
  

describe('GET /proposal/:proposalId', () => {
    it('should get proposal by ID', async () => {
        // Dati di esempio per il test
        const proposalId = '123'; // Sostituisci con un ID valido per il test
        const mockProposalData = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire la proposta
        };

        // Mock del controller per simulare il recupero della proposta
        applicationsController.getProposalById = jest.fn().mockResolvedValue(mockProposalData);

        // Effettua una richiesta GET all'endpoint
        const response = await request(app)
        .get(`/proposal/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(200);

        // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
        expect(applicationsController.getProposalById).toHaveBeenCalledWith(proposalId);

        // Verifica la risposta del server
        expect(response.body).toEqual(mockProposalData);
    });

    it('should handle errors when getting proposal by ID', async () => {
        // Dati di esempio per il test
        const proposalId = '123'; // Sostituisci con un ID valido per il test
        const mockError = new Error('Failed to get proposal');

        // Mock del controller per simulare un errore nel recupero della proposta
        applicationsController.getProposalById = jest.fn().mockRejectedValue(mockError);

        // Effettua una richiesta GET all'endpoint
        const response = await request(app)
        .get(`/proposal/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(500);

        // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
        // (anche se la chiamata ha generato un errore)
        expect(applicationsController.getProposalById).toHaveBeenCalledWith(proposalId);

        // Verifica la risposta del server
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});
  
describe('GET /student/:studentId', () => {
    it('should get student by ID', async () => {
      // Dati di esempio per il test
      const studentId = '123'; // Sostituisci con un ID valido per il test
      const mockStudentData = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire lo studente
      };
  
      // Mock del controller per simulare il recupero dello studente
      applicationsController.getStudentById = jest.fn().mockResolvedValue(mockStudentData);
  
      // Effettua una richiesta GET all'endpoint
      const response = await request(app)
        .get(`/student/${studentId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      expect(applicationsController.getStudentById).toHaveBeenCalledWith(studentId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual(mockStudentData);
    });
  
    it('should handle errors when getting student by ID', async () => {
      // Dati di esempio per il test
      const studentId = '123'; // Sostituisci con un ID valido per il test
      const mockError = new Error('Failed to get student');
  
      // Mock del controller per simulare un errore nel recupero dello studente
      applicationsController.getStudentById = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta GET all'endpoint
      const response = await request(app)
        .get(`/student/${studentId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationsController.getStudentById).toHaveBeenCalledWith(studentId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
});
  
describe('POST /accept-application/:applicationId', () => {
    it('should accept application by ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockResult = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire il risultato
      };
  
      // Mock del controller per simulare l'accettazione dell'applicazione
      applicationsController.acceptApplication = jest.fn().mockResolvedValue(mockResult);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/accept-application/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      expect(applicationsController.acceptApplication).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual(mockResult);
    });
  
    it('should handle errors when accepting application by ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockError = new Error('Failed to accept application');
  
      // Mock del controller per simulare un errore nell'accettazione dell'applicazione
      applicationsController.acceptApplication = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/accept-application/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationsController.acceptApplication).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });
  
  describe('POST /refuse-application/:applicationId', () => {
    it('should refuse application by ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockResult = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire il risultato
      };
  
      // Mock del controller per simulare il rifiuto dell'applicazione
      applicationsController.refuseApplication = jest.fn().mockResolvedValue(mockResult);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/refuse-application/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      expect(applicationsController.refuseApplication).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual(mockResult);
    });
  
    it('should handle errors when refusing application by ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockError = new Error('Failed to refuse application');
  
      // Mock del controller per simulare un errore nel rifiuto dell'applicazione
      applicationsController.refuseApplication = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/refuse-application/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationsController.refuseApplication).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ error: "Internal Server Error"  });
    });
  });
  
  describe('GET /get-proposal-id/:applicationId', () => {
    it('should get proposal ID by application ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockProposalId = '456'; // Sostituisci con un ID valido per il test
  
      // Mock del controller per simulare il recupero dell'ID della proposta
      applicationsController.getProposalIdByApplicationId = jest.fn().mockResolvedValue(mockProposalId);
  
      // Effettua una richiesta GET all'endpoint
      const response = await request(app)
        .get(`/get-proposal-id/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      expect(applicationsController.getProposalIdByApplicationId).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ proposalId: mockProposalId });
    });
  
    it('should handle errors when getting proposal ID by application ID', async () => {
      // Dati di esempio per il test
      const applicationId = '123'; // Sostituisci con un ID valido per il test
      const mockError = new Error('Failed to get proposal ID');
  
      // Mock del controller per simulare un errore nel recupero dell'ID della proposta
      applicationsController.getProposalIdByApplicationId = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta GET all'endpoint
      const response = await request(app)
        .get(`/get-proposal-id/${applicationId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationsController.getProposalIdByApplicationId).toHaveBeenCalledWith(applicationId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });
  
  describe('POST /reject-waiting-applications/:proposalId', () => {
    it('should reject waiting applications by proposal ID', async () => {
      // Dati di esempio per il test
      const proposalId = '123'; // Sostituisci con un ID valido per il test
      const mockResult = {
        // ... Inserisci qui i dati che si aspetta il controller per restituire il risultato
      };
  
      // Mock del controller per simulare il rifiuto delle applicazioni in attesa
      applicationsController.rejectWaitingApplicationsByProposalId = jest.fn().mockResolvedValue(mockResult);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/reject-waiting-applications/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      expect(applicationsController.rejectWaitingApplicationsByProposalId).toHaveBeenCalledWith(proposalId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual(mockResult);
    });
  
    it('should handle errors when rejecting waiting applications by proposal ID', async () => {
      // Dati di esempio per il test
      const proposalId = '123'; // Sostituisci con un ID valido per il test
      const mockError = new Error('Failed to reject waiting applications');
  
      // Mock del controller per simulare un errore nel rifiuto delle applicazioni in attesa
      applicationsController.rejectWaitingApplicationsByProposalId = jest.fn().mockRejectedValue(mockError);
  
      // Effettua una richiesta POST all'endpoint
      const response = await request(app)
        .post(`/reject-waiting-applications/${proposalId}`)
        .expect('Content-Type', /json/)
        .expect(500);
  
      // Verifica che la chiamata al controller sia stata eseguita con l'ID corretto
      // (anche se la chiamata ha generato un errore)
      expect(applicationsController.rejectWaitingApplicationsByProposalId).toHaveBeenCalledWith(proposalId);
  
      // Verifica la risposta del server
      expect(response.body).toEqual({ error: "Internal Server Error" });
    });
  });
  