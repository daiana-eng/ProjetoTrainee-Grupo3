import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import UserRouter from "../src/domains/Users/controllers/index"

dotenv.config();

export const app: Express = express();

export const options: CorsOptions = {
    credentials: true,
    origin: 'process.env.APP_URL',
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rota de user
app.use("/api/users", UserRouter);

