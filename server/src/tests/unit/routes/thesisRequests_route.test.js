const request = require('supertest');
const express = require('express');
const router = require('../../../routes/thesisRequests.js');

const thesisRequestsController = require('../../../controllers/thesisRequests.js');
const applicationController = require('../../../controllers/thesisRequests.js');


jest.mock('../../../controllers/thesisRequests.js');
jest.mock('../../../controllers/thesisRequests.js');


const app = express();
app.use(express.json());
app.use(router);

describe('Thesis Requests Router', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get all thesis requests', async () => {
      const mockThesisRequests = {
        id: 1,
        title: "Mock Thesis Request",
        description: "Mock description",
        teacherId: "teacher123", // Replace with a valid teacher ID
        studentId: "student456", // Replace with a valid student ID
        type: "mockType",
        notes: "Mock notes",
        status: "mockStatus",
        teacher: {
          // Mock Teacher data
          id: "teacher123",
          surname: "Teacher",
          name: "John",
          email: "john.teacher@example.com",
          COD_GROUP: "A1",
          COD_DEPARTMENT: "DEP1",
        },
        student: {
          // Mock Student data
          id: "student456",
          surname: "Student",
          name: "Alice",
          gender: "Female",
          nationality: "MockNationality",
          email: "alice.student@example.com",
          COD_DEGREE: "mockDegreeCode",
          ENROLLMENT_YEAR: 2022,
          // Add other student fields as needed
        },
      };
      thesisRequestsController.getThesisRequests.mockResolvedValue(mockThesisRequests);
  
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(thesisRequestsController.getThesisRequests).toHaveBeenCalled();
      expect(response.body).toEqual(mockThesisRequests);
    });
  
    it('should get all pending thesis requests', async () => {
      const mockPendingThesisRequests = [/* Mock pending thesis requests data here */];
      thesisRequestsController.getPendingThesisRequests.mockResolvedValue(mockPendingThesisRequests);
  
      const response = await request(app)
        .get('/pending')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(thesisRequestsController.getPendingThesisRequests).toHaveBeenCalled();
      expect(response.body).toEqual(mockPendingThesisRequests);
    });
  
    it('should get secretary-accepted thesis requests', async () => {
      const mockSecretaryAcceptedThesisRequests = [/* Mock secretary-accepted thesis requests data here */];
      thesisRequestsController.getSecretaryAcceptedThesisRequests.mockResolvedValue(mockSecretaryAcceptedThesisRequests);
    
      const response = await request(app)
        .get('/secretary-accepted')
        .expect('Content-Type', /json/)
        .expect(200);
    
      expect(thesisRequestsController.getSecretaryAcceptedThesisRequests).toHaveBeenCalled();
      expect(response.body).toEqual(mockSecretaryAcceptedThesisRequests);
    });

    it('should get thesis requests by teacherId', async () => {
      const teacherId = 'exampleTeacherId';
      const mockThesisRequestsByTeacherId = [/* Mock thesis requests data here */];
      thesisRequestsController.getThesisRequestsByTeacherId.mockResolvedValue(mockThesisRequestsByTeacherId);
    
      const response = await request(app)
        .get(`/teacher/${teacherId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    
      expect(thesisRequestsController.getThesisRequestsByTeacherId).toHaveBeenCalledWith(teacherId);
      expect(response.body).toEqual(mockThesisRequestsByTeacherId);
    });
    
    
  
    // Add more tests for other endpoints...
  
    it('should update thesis request by secretary', async () => {
      const mockResponse = {/* Mock response data here */};
      const mockAction = 'accept';
      const mockId = 1;
  
      thesisRequestsController.actionOnThesisRequestBySecretary.mockResolvedValue(mockResponse);
  
      const response = await request(app)
        .put(`/secretary/${mockAction}/${mockId}`)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(thesisRequestsController.actionOnThesisRequestBySecretary).toHaveBeenCalledWith(mockAction, mockId);
      expect(response.body).toEqual(mockResponse);
    });
  
    it('should get secretary rejected thesis requests', async () => {
      const mockSecretaryRejectedThesisRequests = [/* Mock thesis requests data here */];
      thesisRequestsController.getSecretaryRejectedThesisRequests.mockResolvedValue(mockSecretaryRejectedThesisRequests);
    
      const response = await request(app)
        .get('/secretary-rejected')
        .expect('Content-Type', /json/)
        .expect(200);
    
      expect(thesisRequestsController.getSecretaryRejectedThesisRequests).toHaveBeenCalled();
      expect(response.body).toEqual(mockSecretaryRejectedThesisRequests);
    });

    it('should get thesis request by ID', async () => {
      const mockThesisRequest = {/* Mock thesis request data here */};
      const thesisRequestId = 123; // Replace with the actual ID you want to use for testing
      thesisRequestsController.getThesisRequestsById.mockResolvedValue(mockThesisRequest);
    
      const response = await request(app)
        .get(`/${thesisRequestId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    
      expect(thesisRequestsController.getThesisRequestsById).toHaveBeenCalledWith(thesisRequestId);
      expect(response.body).toEqual(mockThesisRequest);
    });

    it('should perform action on thesis request by teacher', async () => {
      const mockAction = 'accept'; // Replace with 'reject' for testing the rejection case
      const mockThesisRequestId = 456; // Replace with the actual ID you want to use for testing
      const mockResponseData = {/* Mock response data here */};
      thesisRequestsController.actionOnThesisRequestByTeacher.mockResolvedValue(mockResponseData);
    
      const response = await request(app)
        .put(`/teacher/${mockAction}/${mockThesisRequestId}`)
        .expect('Content-Type', /json/)
        .expect(200);
    
      expect(thesisRequestsController.actionOnThesisRequestByTeacher).toHaveBeenCalledWith(mockAction, mockThesisRequestId);
      expect(response.body).toEqual(mockResponseData);
    });
    
    
    
  });