-- CreateTable
CREATE TABLE "ASPs" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "hwID" TEXT NOT NULL,
    "sourceURL" TEXT,
    "enablePlayback" BOOLEAN NOT NULL
);
