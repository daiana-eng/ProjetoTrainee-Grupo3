// testUser.ts
import userService from './UserServices.js';
import prisma from '../../../../config/prismaClient.js';

async function main() {
  // Teste CREATE
  await userService.create({
    email: 'teste@exemplo.com',
    password: '123456',
    name: 'Usuário Teste',
    photo: 'foto.jpg',
    premium_id: 1
  });
  console.log('Usuário criado!');

  // Teste UPDATE
  await userService.update('teste@exemplo.com', '123456', {
    name: 'Nome Atualizado',
    photo: 'nova_foto.jpg',
    newPassword: 'novaSenha123'
  });
  console.log('Usuário atualizado!');

  // Teste DELETE
  await userService.delete('teste@exemplo.com', 'novaSenha123');
  console.log('Usuário deletado!');
}

await prisma.premium.create({
  data: { name: 'Premium Teste' }
});

main().catch(console.error);