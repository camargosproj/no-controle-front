/*
  Warnings:

  - Made the column `createdAt` on table `Balance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Balance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Income` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Income` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `SharedTransactionGroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `SharedTransactionGroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `TransactionGroup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `TransactionGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Balance` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Expense` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Income` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `SharedTransactionGroup` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `TransactionGroup` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;
