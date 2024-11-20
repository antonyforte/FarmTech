-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proprietar" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "clima" TEXT NOT NULL,
    "usercpf" TEXT NOT NULL,
    CONSTRAINT "Farm_usercpf_fkey" FOREIGN KEY ("usercpf") REFERENCES "User" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
