-- CreateTable
CREATE TABLE "streamKeys" (
    "streamKey" TEXT NOT NULL PRIMARY KEY,
    "pwd" TEXT,
    "alias" TEXT,
    "start" DATETIME,
    "end" DATETIME
);
