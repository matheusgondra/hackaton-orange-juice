/*
  Warnings:

  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Administrator";

-- CreateTable
CREATE TABLE "administrator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "administrator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrator_name_key" ON "administrator"("name");
