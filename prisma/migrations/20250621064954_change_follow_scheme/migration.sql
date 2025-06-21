/*
  Warnings:

  - You are about to drop the column `follower` on the `Follow` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `Follow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followingId,followerId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_follower_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_fkey";

-- DropIndex
DROP INDEX "Follow_following_follower_key";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "follower",
DROP COLUMN "following",
ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followingId_followerId_key" ON "Follow"("followingId", "followerId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
