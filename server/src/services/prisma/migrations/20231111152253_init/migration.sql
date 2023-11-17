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
    "COD_DEGREE" TEXT NOT NULL,
    "TITLE_DEGREE" TEXT NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("COD_DEGREE")
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
    "id" INTEGER NOT NULL,
    "COD_COURSE" TEXT NOT NULL,
    "TITLE_COURSE" TEXT NOT NULL,
    "CFU" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id","COD_COURSE")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "COD_DEGREE" TEXT NOT NULL,
    "ENROLLMENT_YEAR" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT,
    "STUDENT_ID" INTEGER NOT NULL,
    "PROPOSAL_ID" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
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
    "cds" TEXT NOT NULL,
    "requiredKnowledge" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Courses_COD_COURSE_key" ON "Courses"("COD_COURSE");

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_id_fkey" FOREIGN KEY ("id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_COD_DEGREE_fkey" FOREIGN KEY ("COD_DEGREE") REFERENCES "Degree"("COD_DEGREE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_STUDENT_ID_fkey" FOREIGN KEY ("STUDENT_ID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_PROPOSAL_ID_fkey" FOREIGN KEY ("PROPOSAL_ID") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_supervisor_fkey" FOREIGN KEY ("supervisor") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_cds_fkey" FOREIGN KEY ("cds") REFERENCES "Degree"("COD_DEGREE") ON DELETE RESTRICT ON UPDATE CASCADE;
