import { Prisma } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

type PremiumCreateInput = Prisma.PremiumCreateInput;

class PremiumService {
  async create(data: PremiumCreateInput) {
    return await prisma.premium.create({
      data: {
        name: data.name,
        promotions_shows: data.promotions_shows
      }
    });
  }
}

export default new PremiumService();
