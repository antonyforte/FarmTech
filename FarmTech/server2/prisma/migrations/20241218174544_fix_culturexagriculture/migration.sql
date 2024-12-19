/*
  Warnings:

  - You are about to drop the column `cultureid` on the `Agriculture` table. All the data in the column will be lost.
  - Added the required column `agricultureid` to the `Culture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agriculture" (
    "tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor_unid" REAL NOT NULL,
    "neces_clima" TEXT NOT NULL
);
INSERT INTO "new_Agriculture" ("neces_clima", "nome", "tipo", "valor_unid") SELECT "neces_clima", "nome", "tipo", "valor_unid" FROM "Agriculture";
DROP TABLE "Agriculture";
ALTER TABLE "new_Agriculture" RENAME TO "Agriculture";
CREATE UNIQUE INDEX "Agriculture_tipo_key" ON "Agriculture"("tipo");
CREATE TABLE "new_Culture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "local" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "farmid" INTEGER NOT NULL,
    "agricultureid" INTEGER NOT NULL,
    CONSTRAINT "Culture_farmid_fkey" FOREIGN KEY ("farmid") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Culture" ("farmid", "id", "local", "qtd") SELECT "farmid", "id", "local", "qtd" FROM "Culture";
DROP TABLE "Culture";
ALTER TABLE "new_Culture" RENAME TO "Culture";
CREATE UNIQUE INDEX "Culture_id_key" ON "Culture"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
