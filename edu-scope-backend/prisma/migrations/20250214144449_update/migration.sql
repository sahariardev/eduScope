-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
