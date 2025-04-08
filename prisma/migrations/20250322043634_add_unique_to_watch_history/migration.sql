/*
  Warnings:

  - A unique constraint covering the columns `[userId,articleId,createdAt]` on the table `WatchHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchHistory_userId_articleId_createdAt_key" ON "WatchHistory"("userId", "articleId", "createdAt");
