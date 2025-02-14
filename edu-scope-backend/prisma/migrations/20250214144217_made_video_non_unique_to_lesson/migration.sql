-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_videoId_fkey`;

-- DropIndex
DROP INDEX `lessons_videoId_key` ON `lessons`;

