import express from 'express'
import cors from 'cors'
import morgan from "morgan";

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
export default app;