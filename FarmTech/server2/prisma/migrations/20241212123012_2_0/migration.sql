-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Culture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "local" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "farmid" INTEGER NOT NULL,
    CONSTRAINT "Culture_farmid_fkey" FOREIGN KEY ("farmid") REFERENCES "Farm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Culture" ("farmid", "id", "local", "qtd") SELECT "farmid", "id", "local", "qtd" FROM "Culture";
DROP TABLE "Culture";
ALTER TABLE "new_Culture" RENAME TO "Culture";
CREATE UNIQUE INDEX "Culture_id_key" ON "Culture"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
