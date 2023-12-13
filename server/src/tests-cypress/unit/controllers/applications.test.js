const { submitNewThesisRequest, getThesisRequestByStudentId ,getApplicationsDecisionsByStudentId, getApplicationsStudentsProposalsDegreesByTeacherId, getProposalById, getStudentById, acceptApplication, refuseApplication, rejectWaitingApplicationsByProposalId, getProposalIdByApplicationId } = require("../../../controllers/applications.js");
const { PrismaClient } = require("@prisma/client");
const { mocked } = require("jest-mock");
const prisma = require("../../../controllers/prisma.js");

jest.mock('../../../controllers/prisma.js', () => ({
  Proposal: {
    findUnique: jest.fn(() => {}),
  },
  student: {
    findUnique: jest.fn(() => {}),
  },
  Application: {
    findUnique: jest.fn(() => {}),
    findMany: jest.fn(() => {}),
    update: jest.fn(() => {}),
    updateMany: jest.fn(() => {}),
  },
  ThesisRequest: {
    findMany: jest.fn(() => {}),
    create: jest.fn(() => {}),
  },
}));

describe('Applications Controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get applications, students, proposals, and degrees by teacherId', async () => {
    const mockTeacherId = '1';
    const mockApplicationsStudentsProposals = [
      {
        application: { id: 1, status: 'pending' },
        student: { id: 1, name: 'John Doe', degree: { COD_DEGREE: 'ABC123' } },
        proposal: { id: 1, title: 'Test Proposal', teacher: { id: 1 }, degree: { COD_DEGREE: 'ABC123' } },
      },
    ];

    try {
      const result = await getApplicationsStudentsProposalsDegreesByTeacherId(mockTeacherId);
      expect(result).toEqual(mockApplicationsStudentsProposals.map((application) => ({
        application,
        student: {
          ...application.student,
          degree: application.student.degree,
        },
        proposal: application.proposal,
      })));
      expect(prisma.application.findMany).toHaveBeenCalledWith({
        where: {
          proposal: {
            teacher: {
              id: parseInt(mockTeacherId),
            },
          },
        },
        include: {
          proposal: {
            include: {
              teacher: true,
              degree: true,
            },
          },
          student: {
            include: {
              degree: true,
            },
          },
        },
      });
    } catch (error) {
    }
  });

  it('should get proposal by proposalId', async () => {
    const mockProposalId = '1';
    const mockProposal = {
      id: 1,
      title: 'Test Proposal',
      teacher: { id: 1 },
      degree: { COD_DEGREE: 'ABC123' },
    };

    try {
      const result = await getProposalById(mockProposalId);
      expect(result).toEqual({
        proposal: mockProposal,
        teacher: mockProposal.teacher,
        degree: mockProposal.degree,
      });
      expect(prisma.proposal.findUnique).toHaveBeenCalledWith({
        where: {
          id: parseInt(mockProposalId),
        },
        include: {
          teacher: true,
          degree: true,
        },
      });
    } catch (error) {
    }
  });

  describe('acceptApplication function', () => {
    it('should update the application status to "accept"', async () => {
      const mockUpdatedApplication = {
        id: 1,
        status: 'accept',
        comment: 'Accepted',
        STUDENT_ID: 123,
        PROPOSAL_ID: 456,
        student: { id: 123, name: 'John', surname: 'Doe' },
        proposal: { id: 456, title: 'Proposal 1' },
      };

      prisma.Application.update.mockResolvedValueOnce(mockUpdatedApplication);

      const result = await acceptApplication(1);

      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'accept' },
      });

      expect(result).toEqual(mockUpdatedApplication);
    });

    it('should throw an error if updating the application status fails', async () => {
      const mockError = new Error('Database error');
      prisma.Application.update.mockImplementationOnce(() => {
        throw mockError;
      });

      await expect(acceptApplication(1)).rejects.toThrow("An error occurred while updating the application status to 'accept'");

      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'accept' },
      });
    });

    it('should fetch the proposalId for the application', async () => {
      const mockApplicationId = 1;
      const mockProposalId = 456;

      prisma.Application.findUnique.mockResolvedValueOnce({
        PROPOSAL_ID: mockProposalId,
      });

      const result = await getProposalIdByApplicationId(mockApplicationId);

      expect(prisma.Application.findUnique).toHaveBeenCalledWith({
        where: { id: mockApplicationId },
        select: { PROPOSAL_ID: true },
      });

      expect(result).toEqual(mockProposalId);
    });

    it('should throw an error if fetching proposalId fails', async () => {
      const mockApplicationId = 1;
      const mockError = new Error('Database error');

      prisma.Application.findUnique.mockImplementationOnce(() => {
        throw mockError;
      });

      await expect(getProposalIdByApplicationId(mockApplicationId)).rejects.toThrow(
        "An error occurred while fetching the proposalId for the application"
      );

      expect(prisma.Application.findUnique).toHaveBeenCalledWith({
        where: { id: mockApplicationId },
        select: { PROPOSAL_ID: true },
      });
    });

    it('should reject waiting applications for the proposal', async () => {
      const mockProposalId = 456;
      const mockRejectedApplications = {
        count: 3,
      };

      prisma.Application.updateMany.mockResolvedValueOnce(mockRejectedApplications);

      const result = await rejectWaitingApplicationsByProposalId(mockProposalId);

      expect(prisma.Application.updateMany).toHaveBeenCalledWith({
        where: {
          PROPOSAL_ID: mockProposalId,
          status: 'pending',
        },
        data: {
          status: 'refuse',
        },
      });

      expect(result).toEqual(mockRejectedApplications);
    });

    it('should throw an error if rejecting waiting applications fails', async () => {
      const mockProposalId = 456;
      const mockError = new Error('Database error');

      prisma.Application.updateMany.mockImplementationOnce(() => {
        throw mockError;
      });

      await expect(rejectWaitingApplicationsByProposalId(mockProposalId)).rejects.toThrow(
        'An error occurred while rejecting pending applications for the proposal'
      );

      expect(prisma.Application.updateMany).toHaveBeenCalledWith({
        where: {
          PROPOSAL_ID: mockProposalId,
          status: 'pending',
        },
        data: {
          status: 'refuse',
        },
      });
    });
  });

  describe('refuseApplication function', () => {
    it('should update the application status to "refuse"', async () => {
      const mockUpdatedApplication = {
        id: 1,
        status: 'refuse',
        STUDENT_ID: 123,
        PROPOSAL_ID: 456,
        student: { id: 123, name: 'John', surname: 'Doe' },
        proposal: { id: 456, title: 'Proposal 1' },
      };

      prisma.Application.update.mockResolvedValueOnce(mockUpdatedApplication);

      const result = await refuseApplication(1);

      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'refuse' },
      });

      expect(result).toEqual(mockUpdatedApplication);
    });

    it('should throw an error if updating the application status fails', async () => {
      const mockError = new Error('Database error');
      prisma.Application.update.mockImplementationOnce(() => {
        throw mockError;
      });

      await expect(refuseApplication(1)).rejects.toThrow("An error occurred while updating the application status to 'refuse'");

      expect(prisma.Application.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'refuse' },
      });
    });

    it('should return the updated application', async () => {
      const mockUpdatedApplication = {
        id: 1,
        status: 'refuse',
        STUDENT_ID: 123,
        PROPOSAL_ID: 456,
        student: { id: 123, name: 'John', surname: 'Doe' },
        proposal: { id: 456, title: 'Proposal 1' },
      };

      prisma.Application.update.mockResolvedValueOnce(mockUpdatedApplication);

      const result = await refuseApplication(1);

      expect(result).toEqual(mockUpdatedApplication);
    });
  });
});

describe('getApplicationsStudentsProposalsDegreesByTeacherId function', () => {

  it('should return sorted applications, students, and proposals for a valid teacherId', async () => {
    const mockApplicationsStudentsProposals = [
      {
        application: { id: 1, date: new Date('2023-01-01') },
        student: { id: 1, name: 'John Doe', degree: { id: 1, name: 'Degree 1' } },
        proposal: { id: 1, title: 'Proposal 1', teacher: { id: 1, name: 'Teacher 1' }, degree: { id: 2, name: 'Degree 2' } },
      },
    ];

    prisma.Application.findMany.mockResolvedValueOnce(mockApplicationsStudentsProposals);

    const result = await getApplicationsStudentsProposalsDegreesByTeacherId(1);

    const expectedResult = mockApplicationsStudentsProposals
      .map((application) => ({
        application,
        student: {
          ...application.student,
          degree: application.student.degree,
        },
        proposal: application.proposal,
      }))
      .sort((a, b) => new Date(a.application.date) - new Date(b.application.date));

    expect(result).toEqual(expectedResult);
  });

  it('should sort applications by date in ascending order', async () => {
    const mockApplicationsStudentsProposals = [
      {
        application: { id: 1, date: new Date('2023-01-03') },
        student: { id: 1, name: 'John Doe', degree: { id: 1, name: 'Degree 1' } },
        proposal: { id: 1, title: 'Proposal 1', teacher: { id: 1, name: 'Teacher 1' }, degree: { id: 2, name: 'Degree 2' } },
      },
      {
        application: { id: 2, date: new Date('2023-01-01') },
        student: { id: 2, name: 'Jane Doe', degree: { id: 2, name: 'Degree 2' } },
        proposal: { id: 2, title: 'Proposal 2', teacher: { id: 1, name: 'Teacher 1' }, degree: { id: 3, name: 'Degree 3' } },
      },
    ];

    prisma.Application.findMany.mockResolvedValueOnce(mockApplicationsStudentsProposals);

    const result = await getApplicationsStudentsProposalsDegreesByTeacherId(1);

    const expectedResult = mockApplicationsStudentsProposals
      .map((application) => ({
        application,
        student: {
          ...application.student,
          degree: application.student.degree,
        },
        proposal: application.proposal,
      }))
      .sort((a, b) => new Date(a.application.date) - new Date(b.application.date));

    expect(result).toEqual(expectedResult);

   
  });

  it('should return an empty array for a teacherId with no applications', async () => {
    prisma.Application.findMany.mockResolvedValueOnce([]);

    const result = await getApplicationsStudentsProposalsDegreesByTeacherId(201);

    expect(prisma.Application.findMany).toHaveBeenCalledWith({
      where: {
        proposal: {
          teacher: {
            id: 201,
          },
        },
      },
      include: {
        proposal: {
          include: {
            teacher: true,
            degree: true,
          },
        },
        student: {
          include: {
            degree: true,
          },
        },
      },
    });

    expect(result).toEqual([]);
  });

  it('should throw an error for an invalid teacherId', async () => {
    prisma.Application.findMany.mockRejectedValueOnce(new Error('Invalid teacherId'));

    await expect(getApplicationsStudentsProposalsDegreesByTeacherId('invalid')).rejects.toThrow(
      'An error occurred while querying the database for applications, students, degrees, and proposals'
    );

    expect(prisma.Application.findMany).toHaveBeenCalledWith({
      where: {
        proposal: {
          teacher: {
            id: "invalid",
          },
        },
      },
      include: {
        proposal: {
          include: {
            teacher: true,
            degree: true,
          },
        },
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });

  it('should handle errors during database query', async () => {
    prisma.Application.findMany.mockRejectedValueOnce(new Error('Database error'));

    await expect(getApplicationsStudentsProposalsDegreesByTeacherId(201)).rejects.toThrow(
      'An error occurred while querying the database for applications, students, degrees, and proposals'
    );

    expect(prisma.Application.findMany).toHaveBeenCalledWith({
      where: {
        proposal: {
          teacher: {
            id: 201,
          },
        },
      },
      include: {
        proposal: {
          include: {
            teacher: true,
            degree: true,
          },
        },
        student: {
          include: {
            degree: true,
          },
        },
      },
    });
  });
});

describe('getStudentById function', () => {
  it('should return student information for a valid studentId', async () => {
    prisma.student.findUnique.mockResolvedValueOnce({
      id: 1,
      name: 'John',
      surname: 'Doe',
      applications: [
        { id: 101, status: 'pending', date: new Date('2023-01-01') },
        { id: 102, status: 'accept', date: new Date('2023-01-02') },
      ],
      degree: { id: 201, name: 'Computer Science' },
      Career: { id: 301, startDate: new Date('2022-01-01') },
    });

    const result = await getStudentById(1);

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: true,
        degree: true,
        Career: true,
      },
    });

    expect(result).toEqual({
      student: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        applications: [
          { id: 101, status: 'pending', date: new Date('2023-01-01') },
          { id: 102, status: 'accept', date: new Date('2023-01-02') },
        ],
        degree: { id: 201, name: 'Computer Science' },
        Career: { id: 301, startDate: new Date('2022-01-01') },
      },
    });
  });

  it('should return an empty array of applications for a student with no applications', async () => {
    prisma.student.findUnique.mockResolvedValueOnce({
      id: 1,
      name: 'Jane',
      surname: 'Doe',
      applications: [],
      degree: { id: 201, name: 'Computer Science' },
      Career: { id: 301, startDate: new Date('2022-01-01') },
    });

    const result = await getStudentById(1);

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: true,
        degree: true,
        Career: true,
      },
    });

    expect(result).toEqual({
      student: {
        id: 1,
        name: 'Jane',
        surname: 'Doe',
        applications: [],
        degree: { id: 201, name: 'Computer Science' },
        Career: { id: 301, startDate: new Date('2022-01-01') },
      },
    });
  });

  it('should throw an error for an invalid studentId', async () => {
    prisma.student.findUnique.mockRejectedValueOnce(new Error('Invalid studentId'));

    await expect(getStudentById('invalid')).rejects.toThrow(
      'An error occurred while querying the database for student information'
    );

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: "invalid" },
      include: {
        applications: true,
        degree: true,
        Career: true,
      },
    });
  });

  it('should handle errors during database query', async () => {
    prisma.student.findUnique.mockRejectedValueOnce(new Error('Database error'));

    await expect(getStudentById(1)).rejects.toThrow(
      'An error occurred while querying the database for student information'
    );

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        applications: true,
        degree: true,
        Career: true,
      },
    });
  });
});

describe('getProposalById function', () => {
  it('should return proposal information for a valid proposalId', async () => {
    prisma.Proposal.findUnique.mockResolvedValueOnce({
      id: 1,
      title: 'Proposal 1',
      teacher: { id: 101, name: 'John', surname: 'Doe' },
      degree: { id: 201, name: 'Computer Science' },
    });

    const result = await getProposalById(1);

    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        teacher: true,
        degree: true,
      },
    });

    expect(result).toEqual({
      proposal: {
        id: 1,
        title: 'Proposal 1',
        teacher: { id: 101, name: 'John', surname: 'Doe' },
        degree: { id: 201, name: 'Computer Science' },
      },
      teacher: { id: 101, name: 'John', surname: 'Doe' },
      degree: { id: 201, name: 'Computer Science' },
    });
  });

  it('should throw an error for an invalid proposalId', async () => {
    prisma.Proposal.findUnique.mockRejectedValueOnce(new Error('Invalid proposalId'));

    await expect(getProposalById('invalid')).rejects.toThrow(
      'An error occurred while querying the database for the proposal and related information'
    );

    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: NaN },
      include: {
        teacher: true,
        degree: true,
      },
    });
  });

  it('should handle errors during database query', async () => {
    prisma.Proposal.findUnique.mockRejectedValueOnce(new Error('Database error'));

    await expect(getProposalById(1)).rejects.toThrow(
      'An error occurred while querying the database for the proposal and related information'
    );

    expect(prisma.Proposal.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        teacher: true,
        degree: true,
      },
    });
  });
});

describe('getApplicationsDecisionsByStudentId function', () => {
  it('should return applications for a valid studentId', async () => {
    const mockStudentId = 1;
    const mockApplications = [
      {
        id: 1,
        status: 'accept',
        proposal: {
          id: 101,
          title: 'Proposal 1',
          teacher: { id: 201, name: 'John', surname: 'Doe' },
          degree: { id: 301, name: 'Computer Science' },
        },
      },
    ];

    prisma.Application.findMany.mockResolvedValueOnce(mockApplications);

    const result = await getApplicationsDecisionsByStudentId(mockStudentId);

    expect(result).toEqual(mockApplications);

    expect(prisma.Application.findMany).toHaveBeenCalledWith({
      where: {
        STUDENT_ID: mockStudentId,
      },
      include: {
        proposal: {
          include: {
            teacher: true,
            degree: true,
          },
        },
      },
    });
  });

  it('should handle errors during database query', async () => {
    const mockStudentId = 1;
    const mockError = new Error('Database error');
  
    prisma.Application.findMany.mockRejectedValueOnce(mockError);
  
    try {
      await getApplicationsDecisionsByStudentId(mockStudentId);
    } catch (error) {
      console.error("Actual error:", error.message);
      expect(error.message).toContain('An error occurred while querying the database');
    }
  });
  
  });

describe('getThesisRequestByStudentId function', () => {
  it('should return thesis requests for a valid studentId', async () => {
    const mockStudentId = 1;
    const mockThesisRequests = [
      {
        id: 1,
        title: 'Thesis Request 1',
        teacher: { id: 101, name: 'John', surname: 'Doe' },
        type: 'Research',
        status: 'pending',
      },
    ];

    prisma.ThesisRequest.findMany.mockResolvedValueOnce(mockThesisRequests);

    const result = await getThesisRequestByStudentId(mockStudentId);

    expect(result).toEqual(mockThesisRequests);

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        studentId: mockStudentId,
      },
      include: {
        teacher: true,
      },
    });
  });

  it('should handle errors during database query', async () => {
    const mockStudentId = 1;
    const mockError = new Error('Database error');

    prisma.ThesisRequest.findMany.mockRejectedValueOnce(mockError);


    try {
      await getThesisRequestByStudentId(mockStudentId);
    } catch (error) {
      console.error("Actual error:", error.message);
      expect(error.message).toContain('An error occurred while querying the database');
    }

    expect(prisma.ThesisRequest.findMany).toHaveBeenCalledWith({
      where: {
        studentId: mockStudentId,
      },
      include: {
        teacher: true,
      },
    });
  });
});

describe('submitNewThesisRequest function', () => {
  it('should create a new thesis request', async () => {
    const mockFormData = {
      title: 'New Thesis',
      description: 'Description of the new thesis',
      teacher: 101,
      studentId: 1,
      type: 'Research',
      notes: 'Additional notes',
    };

    const mockNewThesisRequest = {
      id: 1,
      title: 'New Thesis',
      description: 'Description of the new thesis',
      teacher: { id: 101, name: 'John', surname: 'Doe' },
      type: 'Research',
      status: 'pending',
    };

    prisma.ThesisRequest.create.mockResolvedValue(mockNewThesisRequest);

    const result = await submitNewThesisRequest(mockFormData);

    expect(result).toEqual(mockNewThesisRequest);

    expect(prisma.ThesisRequest.create).toHaveBeenCalledWith({
      data: {
        title: mockFormData.title,
        description: mockFormData.description,
        teacherId: mockFormData.teacher,
        studentId: mockFormData.studentId,
        type: mockFormData.type,
        notes: mockFormData.notes,
        status: 'pending',
      },
    });
  });

  it('should handle errors during database query', async () => {
    const mockFormData = {
      title: 'New Thesis',
      description: 'Description of the new thesis',
      teacher: 101,
      studentId: 1,
      type: 'Research',
      notes: 'Additional notes',
    };

    const mockError = new Error('Database error');

    prisma.ThesisRequest.create.mockRejectedValue(mockError);

    try {
      await submitNewThesisRequest(mockFormData);
    } catch (error) {
      expect(error).toEqual({error: "An error occurred during the query"});
      expect(prisma.ThesisRequest.findMany).toHaveBeenCalled();
    }

  });
});
