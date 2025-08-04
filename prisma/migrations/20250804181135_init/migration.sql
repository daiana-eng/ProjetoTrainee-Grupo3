-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "premium_id" INTEGER,

    PRIMARY KEY ("email", "password"),
    CONSTRAINT "User_premium_id_fkey" FOREIGN KEY ("premium_id") REFERENCES "Premium" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Music" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artistic_genre" TEXT,
    "album" TEXT,
    "artist_id" INTEGER NOT NULL,
    CONSTRAINT "Music_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number_of_streams" INTEGER NOT NULL,
    "photo" TEXT,
    "shows" TEXT
);

-- CreateTable
CREATE TABLE "Premium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "promotions_shows" TEXT
);

-- CreateTable
CREATE TABLE "UserMusic" (
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "music_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_email", "user_password", "music_id"),
    CONSTRAINT "UserMusic_user_email_user_password_fkey" FOREIGN KEY ("user_email", "user_password") REFERENCES "User" ("email", "password") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMusic_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "Music" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
