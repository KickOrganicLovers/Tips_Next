/*
  Warnings:

  - You are about to drop the column `followFrom` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `followTo` on the `Follow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[following,follower]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `follower` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followFrom_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followTo_fkey";

-- DropIndex
DROP INDEX "Follow_followTo_followFrom_key";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followFrom",
DROP COLUMN "followTo",
ADD COLUMN     "follower" INTEGER NOT NULL,
ADD COLUMN     "following" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_following_follower_key" ON "Follow"("following", "follower");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_fkey" FOREIGN KEY ("following") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_fkey" FOREIGN KEY ("follower") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
