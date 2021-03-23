-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_streamKeys" (
    "streamKey" TEXT NOT NULL PRIMARY KEY,
    "pwd" TEXT,
    "alias" TEXT,
    "start" TEXT,
    "end" TEXT
);
INSERT INTO "new_streamKeys" ("streamKey", "pwd", "alias", "start", "end") SELECT "streamKey", "pwd", "alias", "start", "end" FROM "streamKeys";
DROP TABLE "streamKeys";
ALTER TABLE "new_streamKeys" RENAME TO "streamKeys";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
