-- CreateTable
CREATE TABLE "VedioData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "VedioData_pkey" PRIMARY KEY ("id")
);
