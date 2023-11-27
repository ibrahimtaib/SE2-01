const { PrismaClient } = require("@prisma/client");
const faker = require("faker");
const { STATUS } = require("../../constants/application");
const prisma = require("../../controllers/prisma");

async function populateDatabase() {
  prisma.$transaction(async (prisma) => {
    // Populate Teachers
    const teachers = await Promise.all(
      Array.from({ length: 5 }).map(async () => {
        return prisma.teacher.create({
          data: {
            surname: faker.name.lastName(),
            name: faker.name.firstName(),
            email: faker.internet.email(),
            COD_GROUP: faker.random.alphaNumeric(5),
            COD_DEPARTMENT: faker.random.alphaNumeric(5),
          },
        });
      })
    );

    // Populate Degrees
    const degrees = await Promise.all(
      Array.from({ length: 3 }).map(async () => {
        return prisma.degree.create({
          data: {
            COD_DEGREE: faker.random.alphaNumeric(5),
            TITLE_DEGREE: faker.lorem.words(2),
          },
        });
      })
    );

    // Populate Students
    const students = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        return prisma.student.create({
          data: {
            surname: faker.name.lastName(),
            gender: faker.random.arrayElement(["Male", "Female"]),
            nationality: faker.address.country(),
            name: faker.name.firstName(),
            email: faker.internet.email(),
            COD_DEGREE: faker.random.arrayElement(degrees).COD_DEGREE,
            ENROLLMENT_YEAR: faker.datatype.number({ min: 2010, max: 2022 }),
          },
        });
      })
    );

    // Populate Proposals
    const proposals = await Promise.all(
      Array.from({ length: 8 }).map(async () => {
        return prisma.proposal.create({
          data: {
            title: faker.lorem.words(4),
            supervisor: faker.random.arrayElement(teachers).id,
            coSupervisors: faker.name.findName(),
            keywords: [faker.lorem.word(), faker.lorem.word()],
            type: faker.random.arrayElement(["Bachelor", "Master"]),
            groups: [
              faker.random.alphaNumeric(3),
              faker.random.alphaNumeric(3),
            ],
            description: faker.lorem.paragraph(),
            expiration: faker.date.future(),
            level: faker.random.arrayElement([
              "Beginner",
              "Intermediate",
              "Advanced",
            ]),
            cds: faker.random.arrayElement(degrees).COD_DEGREE,
            requiredKnowledge: faker.lorem.words(5),
          },
        });
      })
    );

    // Populate Careers
    const careers = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        return prisma.career.create({
          data: {
            COD_COURSE: faker.random.alphaNumeric(5),
            TITLE_COURSE: faker.lorem.words(2),
            CFU: faker.datatype.number({ min: 1, max: 10 }),
            grade: faker.datatype.number({ min: 60, max: 100 }),
            date: faker.datatype.number({ min: 2010, max: 2022 }),
            student: {
              connect: { id: faker.random.arrayElement(students).id },
            },
          },
        });
      })
    );

    // Populate Applications
    await Promise.all(
      Array.from({ length: 15 }).map(async () => {
        return prisma.application.create({
          data: {
            status: faker.random.arrayElement(
              Array.from(Object.values(STATUS))
            ),
            comment: faker.lorem.sentence(),
            STUDENT_ID: faker.random.arrayElement(students).id,
            PROPOSAL_ID: faker.random.arrayElement(proposals).id,
          },
        });
      })
    );

    console.log("Database populated successfully!");
  });
}
(async () => await populateDatabase())();

module.exports = populateDatabase;
