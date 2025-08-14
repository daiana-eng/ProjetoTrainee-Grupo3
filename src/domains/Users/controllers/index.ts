import { Router, Request, Response, NextFunction } from 'express';
import UserServices from '../services/UserServices';

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserServices.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:email", async (req: Request<{ email: string; password: string }>, res: Response, next: NextFunction) => {
  const { email, password } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Parâmetros inválidos" });
  }

  try {
    const user = await UserServices.getByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;