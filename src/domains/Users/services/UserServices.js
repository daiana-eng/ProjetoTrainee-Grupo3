import prisma from "../../../../config/prismaClient.js";
class UserService {
    async create(body) {
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
//# sourceMappingURL=UserServices.js.map