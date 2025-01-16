/*
  Warnings:

  - You are about to drop the column `agricultureid` on the `Need` table. All the data in the column will be lost.
  - You are about to drop the column `productid` on the `Need` table. All the data in the column will be lost.
  - Added the required column `agriculturetipo` to the `Need` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Need` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Need" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "agriculturetipo" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "qtd" INTEGER NOT NULL,
    CONSTRAINT "Need_agriculturetipo_fkey" FOREIGN KEY ("agriculturetipo") REFERENCES "Agriculture" ("tipo") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Need_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Need" ("id", "qtd") SELECT "id", "qtd" FROM "Need";
DROP TABLE "Need";
ALTER TABLE "new_Need" RENAME TO "Need";
CREATE UNIQUE INDEX "Need_id_key" ON "Need"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
