-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followTo" INTEGER NOT NULL,
    "followFrom" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followTo_followFrom_key" ON "Follow"("followTo", "followFrom");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followTo_fkey" FOREIGN KEY ("followTo") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followFrom_fkey" FOREIGN KEY ("followFrom") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
