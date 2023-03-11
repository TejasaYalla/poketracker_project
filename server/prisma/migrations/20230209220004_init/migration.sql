-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dex_number" INTEGER NOT NULL,
    "type_1" TEXT NOT NULL,
    "type_2" TEXT,
    "image_url" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_dex_number_key" ON "Pokemon"("dex_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
