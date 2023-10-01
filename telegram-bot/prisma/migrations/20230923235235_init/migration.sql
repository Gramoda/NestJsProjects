-- CreateTable
CREATE TABLE "Reputations" (
    "id" SERIAL NOT NULL,
    "telegram" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Reputations_pkey" PRIMARY KEY ("id")
);
