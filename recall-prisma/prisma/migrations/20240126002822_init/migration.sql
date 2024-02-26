-- CreateEnum
CREATE TYPE "Availibility" AS ENUM ('IN_STORE', 'ONLINE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sale" BOOLEAN NOT NULL DEFAULT false,
    "avalibility" "Availibility" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
