-- CreateTable
CREATE TABLE "EmailOnVerifying" (
    "email" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "expiration" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailOnVerifying_email_key" ON "EmailOnVerifying"("email");
