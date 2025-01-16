/*
  Warnings:

  - You are about to drop the column `cultureid` on the `Agriculture` table. All the data in the column will be lost.

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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
