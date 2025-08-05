import { User } from "@prisma/client";
import prisma from "../../../../config/prismaClient"

class UserService {
  async create(body: User) {
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        photo: body.photo,
        premium_id: body.premium_id
      }
    });
  }
}

export default new UserService();
