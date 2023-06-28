/*
  Warnings:

  - You are about to drop the column `totalAmmout` on the `AccountGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountGroup` DROP COLUMN `totalAmmout`,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL DEFAULT 0;
