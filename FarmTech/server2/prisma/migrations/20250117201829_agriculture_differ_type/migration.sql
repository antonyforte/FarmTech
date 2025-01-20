/*
  Warnings:

  - Added the required column `colhxanim` to the `Agriculture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agriculture" (
    "tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor_unid" REAL NOT NULL,
    "neces_clima" TEXT NOT NULL,
    "colhxanim" BOOLEAN NOT NULL
);
INSERT INTO "new_Agriculture" ("neces_clima", "nome", "tipo", "valor_unid") SELECT "neces_clima", "nome", "tipo", "valor_unid" FROM "Agriculture";
DROP TABLE "Agriculture";
ALTER TABLE "new_Agriculture" RENAME TO "Agriculture";
CREATE UNIQUE INDEX "Agriculture_tipo_key" ON "Agriculture"("tipo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
