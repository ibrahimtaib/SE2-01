-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "COD_GROUP" TEXT NOT NULL,
    "COD_DEPARTMENT" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degree" (
    "id" SERIAL NOT NULL,
    "COD_DEGREE" INTEGER NOT NULL,
    "TITLE_DEGREE" TEXT NOT NULL,
    "CFU" INTEGER NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "COD_COURSE" INTEGER NOT NULL,
    "TITLE_COURSE" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "COD_COURSE" INTEGER NOT NULL,
    "TITLE_COURSE" TEXT NOT NULL,
    "CFU" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "COD_DEGREE" INTEGER NOT NULL,
    "ENROLLMENT_YEAR" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "supervisor" INTEGER NOT NULL,
    "coSupervisors" TEXT,
    "keywords" TEXT[],
    "type" TEXT NOT NULL,
    "groups" TEXT[],
    "description" TEXT NOT NULL,
    "notes" TEXT,
    "expiration" TIMESTAMP(3) NOT NULL,
    "level" TEXT NOT NULL,
    "cdsProgrammes" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredKnowledge" (
    "id" SERIAL NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "RequiredKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Degree_COD_DEGREE_key" ON "Degree"("COD_DEGREE");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_COD_DEGREE_fkey" FOREIGN KEY ("COD_DEGREE") REFERENCES "Degree"("COD_DEGREE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_supervisor_fkey" FOREIGN KEY ("supervisor") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredKnowledge" ADD CONSTRAINT "RequiredKnowledge_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredKnowledge" ADD CONSTRAINT "RequiredKnowledge_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
