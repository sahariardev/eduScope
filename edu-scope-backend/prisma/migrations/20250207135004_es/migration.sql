/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `videos_title_key` ON `videos`(`title`);
