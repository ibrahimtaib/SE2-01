const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { fakerIT as faker } from '@faker-js/faker';

const teachersData = [
  { id: "auth0|655fd0b96d87729b6b3e0795", surname: faker.person.lastName() , name: faker.person.firstName() , email: "s123456@studenti.polito.it", COD_GROUP: "G1", COD_DEPARTMENT: "D1" },
  { id: "auth0|656262016d87729b6b3f8a7c", surname: faker.person.lastName() , name: faker.person.firstName() , email: "s654321@studenti.polito.it", COD_GROUP: "G1", COD_DEPARTMENT: "D1" },
];

const studentsData = [
  { id: "auth0|655fd050022f6b2083b391fe", surname: faker.person.lastName(), name: faker.person.firstName(), gender: faker.person.sex(), nationality: "Italian", email: "s123456@studenti.polito.it", COD_DEGREE: "1", ENROLLMENT_YEAR: 2020 },
  { id: "auth0|6562618e022f6b2083b51755", surname: faker.person.lastName(), name: faker.person.firstName(), gender: faker.person.sex(), nationality: "Italian", email: "s654321@studenti.polito.it", COD_DEGREE: "0", ENROLLMENT_YEAR: 2020 },
];

const cosupervisorsData = [
  { id: "auth0|65a184585c3ac28cfeb3a679", name: faker.person.firstName(), surname: faker.person.lastName(), email: "cosupervisor1@example.com" },
  { id: "auth0|65a184baf7f3c33a2dccefb8", name: faker.person.firstName(), surname: faker.person.lastName(),  email: "cosupervisor2@example.com" },
];

const secretaryClerksData = [
  { id: "auth0|65748ba4c0b6e8bafce62ed6", surname: faker.person.lastName(), name: faker.person.firstName(), email: "s123456@secretary.polito.it" },
  { id: "auth0|65748c9cc0b6e8bafce62f51", surname: faker.person.lastName(), name: faker.person.firstName(), email: "s123456@secretary.polito.it" },
];

const degreesData = [
    { COD_DEGREE: "0", TITLE_DEGREE: "Computer Science" },
    { COD_DEGREE: "1", TITLE_DEGREE: "Electrical Engineering" },
];

const careersData = [
    { id: "1", COD_COURSE: "Course1", TITLE_COURSE: "Introduction to Programming", CFU: 6, grade: 27, date: 2022, studentId: "auth0|6562618e022f6b2083b51755" },
    { id: "2", COD_COURSE: "Course2", TITLE_COURSE: "Digital Circuits", CFU: 8, grade: 30, date: 2023, studentId: "auth0|656262016d87729b6b3f8a7c" },
    { id: "3", COD_COURSE: "Course1", TITLE_COURSE: "Introduction to Sinusoidal Circuits", CFU: 6, grade: 21, date: 2022, studentId: "auth0|656262016d87729b6b3f8a7c" },
    { id: "4", COD_COURSE: "Course2", TITLE_COURSE: "Software Engineering II", CFU: 8, grade: 30, date: 2023, studentId: "auth0|6562618e022f6b2083b51755" },
  ];

async function checkAndAddData() {
  try {
    // Check if teachers exist
    const existingTeachers = await prisma.teacher.findMany({
      where: {
        id: { in: teachersData.map(teacher => teacher.id) },
      },
    });
    const teachersToAdd = teachersData.filter(teacher => !existingTeachers.some(existing => existing.id === teacher.id));

    if (teachersToAdd.length > 0) {
      // Add teachers
      await prisma.teacher.createMany({ data: teachersToAdd });
      console.log('Teachers added to the database.');
    }

    // Check if students exist
    const existingStudents = await prisma.student.findMany({
      where: {
        id: { in: studentsData.map(student => student.id) },
      },
    });
    const studentsToAdd = studentsData.filter(student => !existingStudents.some(existing => existing.id === student.id));

    if (studentsToAdd.length > 0) {
      // Add students
      await prisma.student.createMany({ data: studentsToAdd });
      console.log('Students added to the database.');
    }

    // Check if cosupervisors exist
    const existingCosupervisors = await prisma.coSupervisor.findMany({
      where: {
        id: { in: cosupervisorsData.map(cosupervisor => cosupervisor.id) },
      },
    });
    const cosupervisorsToAdd = cosupervisorsData.filter(cosupervisor => !existingCosupervisors.some(existing => existing.id === cosupervisor.id));

    if (cosupervisorsToAdd.length > 0) {
      // Add cosupervisors
      await prisma.coSupervisor.createMany({ data: cosupervisorsToAdd });
      console.log('Cosupervisors added to the database.');
    }

    // Check if secretary clerks exist
    const existingSecretaryClerks = await prisma.secretaryClerk.findMany({
      where: {
        id: { in: secretaryClerksData.map(clerk => clerk.id) },
      },
    });
    const secretaryClerksToAdd = secretaryClerksData.filter(clerk => !existingSecretaryClerks.some(existing => existing.id === clerk.id));

    if (secretaryClerksToAdd.length > 0) {
      // Add secretary clerks
      await prisma.secretaryClerk.createMany({ data: secretaryClerksToAdd });
      console.log('Secretary Clerks added to the database.');
    }

    // Check if degrees exist
    const existingDegrees = await prisma.degree.findMany({
        where: {
          COD_DEGREE: { in: degreesData.map(degree => degree.COD_DEGREE) },
        },
      });
      const degreesToAdd = degreesData.filter(degree => !existingDegrees.some(existing => existing.COD_DEGREE === degree.COD_DEGREE));
  
      if (degreesToAdd.length > 0) {
        // Add degrees
        await prisma.degree.createMany({ data: degreesToAdd });
        console.log('Degrees added to the database.');
      }
  
      // Check if careers exist
      const existingCareers = await prisma.career.findMany({
        where: {
          id: { in: careersData.map(career => career.id) },
        },
      });
      const careersToAdd = careersData.filter(career => !existingCareers.some(existing => existing.id === career.id));
  
      if (careersToAdd.length > 0) {
        // Add careers
        await prisma.career.createMany({ data: careersToAdd });
        console.log('Careers added to the database.');
      }

  } catch (error) {
    console.error('Error adding data to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndAddData();
