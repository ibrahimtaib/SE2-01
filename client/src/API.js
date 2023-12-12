/* eslint-disable no-useless-catch */
import dayjs from "dayjs";

const URL = "http://localhost:3001/";

async function getAllProposals() {
  const response = await fetch(`${URL}proposals`); // Attendere che la Promise si risolva
  const proposals = await response.json(); // Attendere che la Promise si risolva
  if (response.ok) {
    return proposals.map((e) => ({
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
    }));
  } else {
    throw proposals;
  }
}

async function getProposalsByCosupervisor(cosupervisors) {
  const response = await fetch(`${URL}proposals/cosupervisor/${cosupervisors}`); // Attendere che la Promise si risolva
  const proposals = await response.json(); // Attendere che la Promise si risolva
  if (response.ok) {
    return proposals.map((e) => ({
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
    }));
  } else {
    throw proposals;
  }
}

async function getProposalsBySupervisor(nameOrSurname) {
  const response = await fetch(`${URL}proposals/supervisor/${nameOrSurname}`); // Attendere che la Promise si risolva
  const proposals = await response.json(); // Attendere che la Promise si risolva
  console.log(proposals)
  if (response.ok) {
    return proposals.map((e) => ({
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      title: e.TITLE_DEGREE,
      cod: e.COD_DEGREE,
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
      title: e,
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
      title: e,
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
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
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
    }));
  } else {
    throw proposals;
  }
}

async function getProposalsByExpirationDate(date) {
  const response = await fetch(`${URL}proposals/expiration/${date}`); // Attendere che la Promise si risolva
  const proposals = await response.json(); // Attendere che la Promise si risolva
  if (response.ok) {
    return proposals.map((e) => ({
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
    }));
  } else {
    throw proposals;
  }
}

async function getTeacherProposals(teacherId) {
  const response = await fetch(`${URL}proposals/teacher/${teacherId}`);
  const proposals = await response.json();
  if (response.ok) {
    return proposals.map((e) => ({
      Supervisor: e.teacher.surname,
      Surname: e.teacher.surname,
      Name: e.teacher.name,
      teacherID: e.teacher.id,
      Cds: e.cds,
      id: e.id,
      Title: e.title,
      Keywords: e.keywords,
      CoSupervisor: e.coSupervisors,
      Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
      date: dayjs(e.expiration).format("YYYY-MM-DD"),
      Groups: e.groups,
      Level: e.level,
      Type: e.type,
      Description: e.description,
      Notes: e.notes,
      RequiredKnowledge: e.requiredKnowledge,
      Teacher: e.teacher.surname,
      titleDegree: e.degree.TITLE_DEGREE,
      deletable: e.deletable,
      archived: e.archived
    }));
  } else {
    throw proposals;
  }
}
async function filterProposals(data) {
  console.log(data)
  try {
    const response = await fetch(`${URL}proposals/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify({ filters: data }), // Invia i filtri nel corpo della richiesta
    });

    if (response.ok) {
      const result = await response.json();
      return result.map((e) => ({
        Supervisor: e.teacher.surname,
        Surname: e.teacher.surname,
        Name: e.teacher.name,
        Cds: e.cds,
        id: e.id,
        Keywords: e.keywords,
        Title: e.title,
        CoSupervisor: e.coSupervisors,
        Expiration: dayjs(e.expiration).format("DD/MM/YYYY"),
        Groups: e.groups,
        Level: e.level,
        Type: e.type,
        Description: e.description,
        Notes: e.notes,
        RequiredKnowledge: e.requiredKnowledge,
        Teacher: e.teacher.name+" "+e.teacher.surname,
        titleDegree: e.degree.TITLE_DEGREE,
        deletable: e.deletable,
        archived: e.archived
      }));
    } else {
      throw new Error("Failed to submit proposal");
    }
  } catch (error) {
    console.error("Error submitting proposal:", error);
    throw error;
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
    throw new Error(data.error || "Failed to fetch proposal");
  }
}

async function getExamAndStudentById(studentId) {
  try {
    const studentResponse = await fetch(
      `${URL}applications/student/${studentId}`
    );
    const studentData = await studentResponse.json();

    if (!studentResponse.ok) {
      throw new Error(
        studentData.error || "Failed to fetch student information"
      );
    }

    return {
      student: studentData,
    };
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

async function acceptApplication(applicationId) {
  try {
    const acceptResponse = await fetch(`${URL}applications/accept-application/${applicationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const acceptData = await acceptResponse.json();

    if (!acceptResponse.ok) {
      throw new Error(acceptData.error || 'Failed to accept application');
    }

    const proposalIdResponse = await fetch(`${URL}applications/get-proposal-id/${applicationId}`);
    const proposalIdData = await proposalIdResponse.json();
    const proposalId = proposalIdData.proposalId;

    const rejectOtherApplicationsResponse = await fetch(`${URL}applications/reject-waiting-applications/${proposalId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const rejectOtherApplicationsData = await rejectOtherApplicationsResponse.json();

    if (!rejectOtherApplicationsResponse.ok) {
      throw new Error(rejectOtherApplicationsData.error || 'Failed to reject other applications');
    }

    return acceptData;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while accepting the application');
  }
}

async function refuseApplication(applicationId) {
  try {
    const response = await fetch(`${URL}applications/refuse-application/${applicationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to refuse application');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while refusing the application');
  }
}

async function getUserInfo() {
  const response = await fetch(URL + "sessions/current", {
    credentials: "include",
  });
  const userInfo = await response.data;
  console.log(response.data);
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;
  }
}

async function getApplicationsByStudentId(id) {
  const response = await fetch(`${URL}applications/decisions/${id}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error || "Failed to fetch proposal");
  }
}

async function getRequestedThesisByStudentId(id) {
  const response = await fetch(`${URL}applications/requestedThesis/${id}`);
  const data = await response.json();

  if (response.ok) {
    return data.map((e) => ({
      ...e,
      requestedThesis: true,
    }));
  } else {
    throw new Error(data.error || "Failed to fetch proposal");
  }
}

async function getTeachers() {
  const response = await fetch(`${URL}teachers/`);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error || "Failed to fetch proposal");
  }
}

async function submitNewThesisRequest(formData){
  try {
    const response = await fetch(`${URL}applications/newThesisRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to refuse application');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while refusing the application');
  }
}

async function getPendingThesisRequests(){
  const response = await fetch(`${URL}thesisRequests/`);
  const response_data = await response.json();
  const data  = response_data.map((e) => ({
      proposal: {
        teacher: e.teacher,
        title: e.title,
        description: e.description,
        notes: e.notes,
        id: e.id,
        type: e.type,
        },
      application: {
        status: e.status,
        id: e.id,
        },
      student: e.student,
      }));
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error || "Failed to fetch proposal");
  }
}

async function getThesisRequestsByTeacherId(id){
  const response = await fetch(`${URL}thesisRequests/teacher/${id}`);
  const response_data = await response.json();
  const data  = response_data.map((e) => ({
      proposal: {
        teacher: e.teacher,
        title: e.title,
        description: e.description,
        notes: e.notes,
        id: e.id,
        type: e.type,
        },
      application: {
        status: e.status,
        id: e.id,
        },
      student: e.student,
      }));
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error || "Failed to fetch thesis request");
  }
}

async function AcceptThesisRequestsBySecretary(id){
  try {
    const response = await fetch(`${URL}thesisRequests/secretary/accept/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to accept thesis request');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while accepting the thesis request');
  }
}

async function RejectThesisRequestsBySecretary(id){
  try {
    const response = await fetch(`${URL}thesisRequests/secretary/reject/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to reject thesis request');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while rejecting the thesis request');
  }
}

async function AcceptThesisRequestsByTeacher(id){
  try {
    const response = await fetch(`${URL}thesisRequests/teacher/accept/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to accept thesis request');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while accepting the thesis request');
  }
}

async function RejectThesisRequestsByTeacher(id){
  try {
    const response = await fetch(`${URL}thesisRequests/teacher/reject/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to reject thesis request');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while rejecting the thesis request');
  }
}

const API = {
  getAllProposals,
  getProposalsByTitle,
  getProposalsByCosupervisor,
  getProposalsBySupervisor,
  getAllCds,
  getApplicationsByTeacherId,
  getProposalById,
  getExamAndStudentById,
  getProposalsByKeywords,
  getProposalsByGroups,
  getAllTypes,
  getAllLevels,
  getProposalsByLevel,
  getProposalsByCds,
  getProposalsByType,
  getProposalsByExpirationDate,
  filterProposals,
  acceptApplication,
  refuseApplication,
  AcceptThesisRequestsBySecretary,
  RejectThesisRequestsBySecretary,
  getUserInfo,
  getApplicationsByStudentId,
  getTeacherProposals,
  getTeachers,
  getRequestedThesisByStudentId,
  submitNewThesisRequest,
  getPendingThesisRequests,
  getThesisRequestsByTeacherId,
  AcceptThesisRequestsByTeacher,
  RejectThesisRequestsByTeacher
};
export default API;
