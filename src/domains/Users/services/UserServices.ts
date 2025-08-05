import prisma from '../../../../config/prismaClient.js';

class UserService {
  async create(body: { email: string; password: string; name: string; photo?: string; premium_id?: number }) {
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        photo: body.photo === undefined ? null : body.photo,
        premium_id: body.premium_id === undefined ? null : body.premium_id
      }
    });
  }

async update(email: string, password: string, data: { name?: string; photo?: string; newPassword?: string }) {
  
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.photo !== undefined) updateData.photo = data.photo === undefined ? null : data.photo;
  if (data.newPassword !== undefined) updateData.password = data.newPassword;

  return await prisma.user.update({
    where: { email_password: { email, password } },
    data: updateData
  });
}
 async delete(email: string, password: string){
  return await prisma.user.delete({
    where: {email_password: {email, password}}
  });
 }
}

export default new UserService();
