import { Artist } from '@prisma/client';
import prisma from '../../../../config/prismaClient.js';

class ArtistService {
  async create(body: Artist) {
    await prisma.artist.create({
      data: {
        name: body.name,
        number_of_streams: body.number_of_streams,
        photo: body.photo ?? null,
        shows: body.shows ?? null,
      }
    });
  }

  async getAll() {
    return await prisma.artist.findMany({
      include: { musics: true },
    });
  }

  async getById(id: number) {
    return await prisma.artist.findUnique({
      where: { id },
      include: { musics: true },
    });
  }

  async update(id: number, data: Partial<Artist>) {
    return await prisma.artist.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.artist.delete({
      where: { id }
    });
  }
}

export default new ArtistService();
