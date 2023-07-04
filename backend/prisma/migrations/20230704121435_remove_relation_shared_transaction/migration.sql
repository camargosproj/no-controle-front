/*
  Warnings:

  - You are about to drop the column `sharedTransactionGroupId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `sharedTransactionGroupId` on the `Income` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_sharedTransactionGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `Income` DROP FOREIGN KEY `Income_sharedTransactionGroupId_fkey`;

-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `sharedTransactionGroupId`;

-- AlterTable
ALTER TABLE `Income` DROP COLUMN `sharedTransactionGroupId`;
