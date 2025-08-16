import express, { Application } from "express";
import userRoutes from "./src/domains/Users/routes/userRoutes.js"; 
import userMusicRoutes from "./src/domains/UserMusic/routes/UserMusicRoutes.js";
import prisma from "./config/prismaClient.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/user-music", userMusicRoutes);

// Rota inicial
app.get("/", (_req, res) => {
  res.send("API rodando!");
});

// Inicializa o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Cria Premium Teste se não existir
  try {
    const existing = await prisma.premium.findFirst({ where: { name: "Premium Teste" } });
    if (!existing) {
      await prisma.premium.create({ data: { name: "Premium Teste" } });
      console.log("Premium Teste criado no banco!");
    }
  } catch (err) {
    console.error("Erro ao criar Premium Teste:", err);
  }
});
