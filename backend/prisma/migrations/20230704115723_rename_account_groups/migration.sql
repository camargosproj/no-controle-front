/*
  Warnings:

  - You are about to drop the column `accountGroupId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `sharedAccountGroupId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `accountGroupId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `sharedAccountGroupId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the `AccountGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedAccountGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AccountGroup` DROP FOREIGN KEY `AccountGroup_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_accountGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_sharedAccountGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `Income` DROP FOREIGN KEY `Income_accountGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `Income` DROP FOREIGN KEY `Income_sharedAccountGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `SharedAccountGroup` DROP FOREIGN KEY `SharedAccountGroup_accountGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `SharedAccountGroup` DROP FOREIGN KEY `SharedAccountGroup_userId_fkey`;

-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `accountGroupId`,
    DROP COLUMN `sharedAccountGroupId`,
    ADD COLUMN `sharedTransactionGroupId` VARCHAR(191) NULL,
    ADD COLUMN `transactionGroupId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Income` DROP COLUMN `accountGroupId`,
    DROP COLUMN `sharedAccountGroupId`,
    ADD COLUMN `sharedTransactionGroupId` VARCHAR(191) NULL,
    ADD COLUMN `transactionGroupId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `AccountGroup`;

-- DropTable
DROP TABLE `SharedAccountGroup`;

-- CreateTable
CREATE TABLE `TransactionGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SharedTransactionGroup` (
    `id` VARCHAR(191) NOT NULL,
    `transactionGroupId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_sharedTransactionGroupId_fkey` FOREIGN KEY (`sharedTransactionGroupId`) REFERENCES `SharedTransactionGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_transactionGroupId_fkey` FOREIGN KEY (`transactionGroupId`) REFERENCES `TransactionGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_sharedTransactionGroupId_fkey` FOREIGN KEY (`sharedTransactionGroupId`) REFERENCES `SharedTransactionGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_transactionGroupId_fkey` FOREIGN KEY (`transactionGroupId`) REFERENCES `TransactionGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionGroup` ADD CONSTRAINT `TransactionGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTransactionGroup` ADD CONSTRAINT `SharedTransactionGroup_transactionGroupId_fkey` FOREIGN KEY (`transactionGroupId`) REFERENCES `TransactionGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTransactionGroup` ADD CONSTRAINT `SharedTransactionGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
