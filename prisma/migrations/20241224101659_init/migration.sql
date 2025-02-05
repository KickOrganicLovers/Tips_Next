-- CreateTable
CREATE TABLE "User"
(
    "id"    SERIAL NOT undefined,
    "email" TEXT   NOT undefined,
    "name"  TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");
