import { Premium } from '@prisma/client';
import prisma from '../../../../config/prismaClient.js';

class PremiumService {
  async create(body: Premium) {
    await prisma.premium.create({
      data: {
        name: body.name,
        promotions_shows: body.promotions_shows ?? null
      }
    });
  }

  async getAll() {
    return await prisma.premium.findMany({
      include: { users: true },
    });
  }

  async getById(id: number) {
    return await prisma.premium.findUnique({
      where: { id },
      include: { users: true },
    });
  }

  async update(id: number, data: Partial<Premium>) {
    return await prisma.premium.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.premium.delete({
      where: { id }
    });
  }
}

export default new PremiumService();
