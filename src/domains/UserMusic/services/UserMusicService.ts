import { UserMusic } from '@prisma/client';
import prisma from '../../../../config/prismaClient.js';

class UserMusicService {
  async create(body: UserMusic) {
    await prisma.userMusic.create({
      data: {
        user_email: body.user_email,
        user_password: body.user_password,
        music_id: body.music_id
      }
    });
  }

  async getAll() {
    return await prisma.userMusic.findMany({
      include: { user: true, music: true },
    });
  }

  async getById(user_email: string, user_password: string, music_id: number) {
    return await prisma.userMusic.findUnique({
      where: {
        user_email_user_password_music_id: {
          user_email,
          user_password,
          music_id
        }
      },
      include: { user: true, music: true },
    });
  }

  async delete(user_email: string, user_password: string, music_id: number) {
    return await prisma.userMusic.delete({
      where: {
        user_email_user_password_music_id: {
          user_email,
          user_password,
          music_id
        }
      }
    });
  }
}

export default new UserMusicService();
