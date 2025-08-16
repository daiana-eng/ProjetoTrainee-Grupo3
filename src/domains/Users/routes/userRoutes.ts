import { Router, Request, Response } from "express";
import UserService from "../services/UserServices.js"; 

const router = Router();

// Definindo a tipagem do usuário
interface User {
  name?: string;
  email: string;
  password: string;
  [key: string]: any; // para permitir outros campos opcionais
}

// CREATE
router.post("/", async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// READ - todos os usuários
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// READ - buscar por email + password
router.get("/:email/:password", async (req: Request<{ email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.params;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const user = await UserService.getById(email, password);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:email/:password", async (req: Request<{ email: string; password: string }, {}, Partial<User>>, res: Response) => {
  try {
    const { email, password } = req.params;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const updatedUser = await UserService.update(email, password, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:email/:password", async (req: Request<{ email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.params;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    await UserService.delete(email, password);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
