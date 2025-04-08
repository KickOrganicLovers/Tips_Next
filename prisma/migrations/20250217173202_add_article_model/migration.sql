-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailImageUrl" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "tags" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");
