-- AlterTable
ALTER TABLE `Balance` MODIFY `expenseTotal` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `balance` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `TransactionGroup` ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;
