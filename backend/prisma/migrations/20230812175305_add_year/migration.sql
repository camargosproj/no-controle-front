/*
  Warnings:

  - Added the required column `year` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `TransactionGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Balance` ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TransactionGroup` ADD COLUMN `year` INTEGER NOT NULL;
