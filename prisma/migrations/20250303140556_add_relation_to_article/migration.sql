/*
  Warnings:

  - Made the column `title` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnailImageUrl` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contents` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "thumbnailImageUrl" SET NOT NULL,
ALTER COLUMN "contents" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
