import { Router, Request, Response } from "express";
import UserMusicService from "../services/UserMusicService.js";

const router = Router();

// CREATE
router.post("/", async (req: Request, res: Response) => {
  try {
    const userMusic = await UserMusicService.create(req.body);
    res.status(201).json(userMusic);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// READ - todos os registros
router.get("/", async (_req: Request, res: Response) => {
  try {
    const userMusics = await UserMusicService.getAll();
    res.json(userMusics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// READ - buscar por user_email, user_password e music_id
router.get("/:user_email/:user_password/:music_id", async (req: Request, res: Response) => {
  try {
    const { user_email, user_password, music_id } = req.params;

    if (!user_email || !user_password || !music_id) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    const idNum = parseInt(music_id, 10);
    const userMusic = await UserMusicService.getById(user_email, user_password, idNum);

    if (!userMusic) return res.status(404).json({ message: "Registro não encontrado" });
    res.json(userMusic);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:user_email/:user_password/:music_id", async (req: Request, res: Response) => {
  try {
    const { user_email, user_password, music_id } = req.params;

    if (!user_email || !user_password || !music_id) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    const idNum = parseInt(music_id, 10);
    await UserMusicService.delete(user_email, user_password, idNum);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
