import { Music } from '@prisma/client';
import prisma from '../../../../config/prismaClient.js';

class MusicService {
  async create(body: Music) {
    await prisma.music.create({
      data: {
        name: body.name,
        artistic_genre: body.artistic_genre ?? null,
        album: body.album ?? null,
        artist_id: body.artist_id
      }
    });
  }

  async getAll() {
    return await prisma.music.findMany({
      include: { artist: true, userMusics: true },
    });
  }

  async getById(id: number) {
    return await prisma.music.findUnique({
      where: { id },
      include: { artist: true, userMusics: true },
    });
  }

  async update(id: number, data: Partial<Music>) {
    return await prisma.music.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.music.delete({
      where: { id }
    });
  }
}

export default new MusicService();
