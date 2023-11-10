/*
  Warnings:

  - The primary key for the `Career` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Degree` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CFU` on the `Degree` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Degree` table. All the data in the column will be lost.
  - You are about to drop the column `cdsProgrammes` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the `RequiredKnowledge` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[COD_COURSE]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cds` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredKnowledge` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequiredKnowledge" DROP CONSTRAINT "RequiredKnowledge_courseId_fkey";

-- DropForeignKey
ALTER TABLE "RequiredKnowledge" DROP CONSTRAINT "RequiredKnowledge_proposalId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_COD_DEGREE_fkey";

-- DropIndex
DROP INDEX "Degree_COD_DEGREE_key";

-- AlterTable
ALTER TABLE "Career" DROP CONSTRAINT "Career_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "COD_COURSE" SET DATA TYPE TEXT,
ADD CONSTRAINT "Career_pkey" PRIMARY KEY ("id", "COD_COURSE");
DROP SEQUENCE "Career_id_seq";

-- AlterTable
ALTER TABLE "Degree" DROP CONSTRAINT "Degree_pkey",
DROP COLUMN "CFU",
DROP COLUMN "id",
ALTER COLUMN "COD_DEGREE" SET DATA TYPE TEXT,
ADD CONSTRAINT "Degree_pkey" PRIMARY KEY ("COD_DEGREE");

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "cdsProgrammes",
ADD COLUMN     "cds" TEXT NOT NULL,
ADD COLUMN     "requiredKnowledge" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "COD_DEGREE" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "RequiredKnowledge";

-- CreateIndex
CREATE UNIQUE INDEX "Courses_COD_COURSE_key" ON "Courses"("COD_COURSE");

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_id_fkey" FOREIGN KEY ("id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_COD_DEGREE_fkey" FOREIGN KEY ("COD_DEGREE") REFERENCES "Degree"("COD_DEGREE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_cds_fkey" FOREIGN KEY ("cds") REFERENCES "Degree"("COD_DEGREE") ON DELETE RESTRICT ON UPDATE CASCADE;
