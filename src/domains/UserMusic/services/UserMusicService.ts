import { Prisma } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

type UserMusicCreateInput = {
  user_email: string;
  user_password: string;
  music_id: number;
};

class UserMusicService {
  async create(data: UserMusicCreateInput) {
    return await prisma.userMusic.create({
      data: {
        user: {
          connect: {
            email_password: {
              email: data.user_email,
              password: data.user_password
            }
          }
        },
        music: {
          connect: { id: data.music_id }
        }
      }
    });
  }
}

export default new UserMusicService();
