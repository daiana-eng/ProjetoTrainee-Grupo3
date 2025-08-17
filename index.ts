import {app} from "./config/expressConfig,";
import dotenv from "dotenv";
import userService from './src/domains/Users/services/UserServices';

dotenv.config();

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
}  

main().catch(console.error);

app.listen(process.env.PORT, () => { 
    console.log(`Servidor em execução na porta ${process.env.PORT}`);
});