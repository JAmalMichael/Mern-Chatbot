import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from './routes/index'
import cookieParser from "cookie-parser";
import cors from 'cors';
config();

const app  = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); //to be removed in production

app.use("/api/v1", appRouter)


export default app;