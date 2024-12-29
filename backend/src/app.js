import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import authRouter from "./routes/auth.router.js";

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use('/auth', authRouter);
export default app;