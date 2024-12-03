/*
  Warnings:

  - You are about to drop the `VedioData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VedioData";

-- CreateTable
CREATE TABLE "VideoData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "VideoData_pkey" PRIMARY KEY ("id")
);
