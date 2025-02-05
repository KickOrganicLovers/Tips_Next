-- CreateTable
CREATE TABLE "EmailOnVerifying" (
    "email" TEXT NOT undefined,
    "hashedToken" TEXT NOT undefined,
    "expiration" TEXT NOT undefined
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailOnVerifying_email_key" ON "EmailOnVerifying"("email");
