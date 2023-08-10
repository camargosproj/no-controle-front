-- AlterTable
ALTER TABLE `Balance` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Income` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SharedTransactionGroup` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `TransactionGroup` ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
