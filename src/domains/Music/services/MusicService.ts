import { Prisma } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

type MusicCreateInput = Prisma.MusicCreateInput;

class MusicService {
  async create(data: MusicCreateInput) {
    return await prisma.music.create({
      data: {
        name: data.name,
        artistic_genre: data.artistic_genre,
        album: data.album,
        artist: {
          connect: { id: data.artist_id }
        }
      }
    });
  }
}

export default new MusicService();
