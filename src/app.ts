import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from './routes/index'
import cookieParser from "cookie-parser";
config();

const app  = express();

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); //to be removed in production

app.use("/api/v1", appRouter)


export default app;