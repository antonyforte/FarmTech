/*
  Warnings:

  - You are about to drop the column `needid` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productid` to the `Need` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Need" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qtd" INTEGER NOT NULL,
    "agricultureid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    CONSTRAINT "Need_agricultureid_fkey" FOREIGN KEY ("agricultureid") REFERENCES "Agriculture" ("tipo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Need" ("agricultureid", "id", "qtd") SELECT "agricultureid", "id", "qtd" FROM "Need";
DROP TABLE "Need";
ALTER TABLE "new_Need" RENAME TO "Need";
CREATE UNIQUE INDEX "Need_id_key" ON "Need"("id");
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL
);
INSERT INTO "new_Product" ("id", "nome", "preco") SELECT "id", "nome", "preco" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
