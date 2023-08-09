/*
  Warnings:

  - Made the column `type` on table `TransactionGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `TransactionGroup` MODIFY `type` ENUM('INCOME', 'EXPENSE') NOT NULL;
