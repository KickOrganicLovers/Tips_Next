/*
  Warnings:

  - Changed the type of `expiration` on the `EmailOnVerifying` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmailOnVerifying" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "expiration",
ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL;
