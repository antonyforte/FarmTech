/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Farm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Culture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "local" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "farmid" INTEGER NOT NULL,
    CONSTRAINT "Culture_farmid_fkey" FOREIGN KEY ("farmid") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agriculture" (
    "tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor_unid" REAL NOT NULL,
    "neces_clima" TEXT NOT NULL,
    "cultureid" INTEGER NOT NULL,
    CONSTRAINT "Agriculture_cultureid_fkey" FOREIGN KEY ("cultureid") REFERENCES "Culture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Need" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qtd" INTEGER NOT NULL,
    "agricultureid" INTEGER NOT NULL,
    CONSTRAINT "Need_agricultureid_fkey" FOREIGN KEY ("agricultureid") REFERENCES "Agriculture" ("tipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "needid" INTEGER NOT NULL,
    CONSTRAINT "Product_needid_fkey" FOREIGN KEY ("needid") REFERENCES "Need" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Culture_id_key" ON "Culture"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Agriculture_tipo_key" ON "Agriculture"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Agriculture_cultureid_key" ON "Agriculture"("cultureid");

-- CreateIndex
CREATE UNIQUE INDEX "Need_id_key" ON "Need"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_needid_key" ON "Product"("needid");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_id_key" ON "Farm"("id");
