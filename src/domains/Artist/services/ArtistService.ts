import { Prisma } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

type ArtistCreateInput = Prisma.ArtistCreateInput;

class ArtistService {
  async create(data: ArtistCreateInput) {
    return await prisma.artist.create({
      data: {
        name: data.name,
        number_of_streams: data.number_of_streams,
        photo: data.photo,
        shows: data.shows
      }
    });
  }
}

export default new ArtistService();
