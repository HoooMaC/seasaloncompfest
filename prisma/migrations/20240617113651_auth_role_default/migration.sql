-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
