const request = require('supertest');
const express = require('express');
const teachersRouter = require('../../../routes/teachers.js');
const teachersController = require('../../../controllers/teachers.js');

const app = express();
app.use(express.json());
app.use('/', teachersRouter);

jest.mock('../../../controllers/teachers.js');

describe('Teachers Router', () => {
  it('should get all teachers', async () => {
    const mockTeachers = [/* dati mockati per la lista di insegnanti */];
    teachersController.getTeachers.mockResolvedValue(mockTeachers);

    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(teachersController.getTeachers).toHaveBeenCalled();
    expect(response.body).toEqual(mockTeachers);
  });

  it('should handle getTeachers error and return 500 status', async () => {
    const mockError = new Error('Failed to get teachers');
    teachersController.getTeachers.mockRejectedValue(mockError);

    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(teachersController.getTeachers).toHaveBeenCalled();
  });

  it('should get teacher by id', async () => {
    const teacherId = 'exampleTeacherId';
    const mockTeacher = {/* dati mockati per l'insegnante */};
    teachersController.getTeachersById.mockResolvedValue(mockTeacher);

    const response = await request(app)
      .get(`/${teacherId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(teachersController.getTeachersById).toHaveBeenCalledWith(teacherId);
    expect(response.body).toEqual(mockTeacher);
  });

  it('should handle getTeachersById error and return 500 status', async () => {
    const teacherId = 'exampleTeacherId';
    const mockError = new Error('Failed to get teacher by id');
    teachersController.getTeachersById.mockRejectedValue(mockError);

    const response = await request(app)
      .get(`/${teacherId}`)
      .expect('Content-Type', /json/)
      .expect(500);

    expect(teachersController.getTeachersById).toHaveBeenCalledWith(teacherId);
  });
});
