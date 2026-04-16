/*
  Warnings:

  - You are about to drop the `_keywordtopost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_keywordtopost` DROP FOREIGN KEY `_KeywordToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_keywordtopost` DROP FOREIGN KEY `_KeywordToPost_B_fkey`;

-- DropTable
DROP TABLE `_keywordtopost`;

-- DropTable
DROP TABLE `keywords`;

-- DropTable
DROP TABLE `posts`;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
