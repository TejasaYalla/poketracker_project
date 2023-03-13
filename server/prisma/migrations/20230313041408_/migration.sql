/*
  Warnings:

  - Made the column `caught` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dex_number" INTEGER NOT NULL,
    "type_1" TEXT NOT NULL,
    "type_2" TEXT,
    "image_url" TEXT,
    "caught" BOOLEAN NOT NULL
);
INSERT INTO "new_Pokemon" ("caught", "dex_number", "id", "image_url", "name", "type_1", "type_2") SELECT "caught", "dex_number", "id", "image_url", "name", "type_1", "type_2" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE UNIQUE INDEX "Pokemon_dex_number_key" ON "Pokemon"("dex_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
