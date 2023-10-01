/*
  Warnings:

  - You are about to drop the column `telegram` on the `Reputations` table. All the data in the column will be lost.
  - Added the required column `telegramId` to the `Reputations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAvatar` to the `Reputations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reputations" DROP COLUMN "telegram",
ADD COLUMN     "telegramId" TEXT NOT NULL,
ADD COLUMN     "userAvatar" TEXT NOT NULL;
