const prisma = require("../../../controllers/prisma.js"); 
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const authController = require("../../../controllers/auth.js");

jest.mock("../../../controllers/prisma.js", () => ({
  teacher: {
    findUnique: jest.fn(),
  },
  student: {
    findUnique: jest.fn(),
  },
}));

describe('Auth Controller', () => {
  describe('checkUser', () => {
    it('should resolve with a customTeacherObject if a teacher is found', async () => {
      // Configura il mock di prisma per restituire un insegnante esistente
      prisma.teacher.findUnique.mockResolvedValue({
        id: '1',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
      });

      // Esegui la funzione di checkUser
      const result = await authController.checkUser('1');

      // Verifica che il risultato sia conforme alle aspettative
      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        role: 'teacher',
        email: 'john.doe@example.com',
      });
    });

    it('should resolve with a customStudentObject if a student is found', async () => {
      // Configura il mock di prisma per restituire uno studente esistente
      prisma.teacher.findUnique.mockResolvedValue(null);
      prisma.student.findUnique.mockResolvedValue({
        id: '2',
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@example.com',
        COD_DEGREE: 'CS123',
      });

      // Esegui la funzione di checkUser
      const result = await authController.checkUser('2');

      // Verifica che il risultato sia conforme alle aspettative
      expect(result).toEqual({
        id: '2',
        name: 'Jane Doe',
        role: 'student',
        email: 'jane.doe@example.com',
        cds: 'CS123',
      });
    });

    it('should reject with an error if no user is found', async () => {
      // Configura il mock di prisma per non trovare né insegnante né studente
      prisma.teacher.findUnique.mockResolvedValue(null);
      prisma.student.findUnique.mockResolvedValue(null);

      // Esegui la funzione di checkUser
      await expect(authController.checkUser('3')).rejects.toThrow('User not found');
    });

    it('should reject with an error if there is an error in the database query', async () => {
      // Configura il mock di prisma per generare un errore
      prisma.teacher.findUnique.mockRejectedValue(new Error('Database error'));

      // Esegui la funzione di checkUser
      await expect(authController.checkUser('4')).rejects.toThrow('Database error');
    });
  });
});
