import express from 'express'
import cors from 'cors'
import authRouter from "./routes/auth.router.js";
import logger from "./services/logger.service.js";

const app = express();
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    const { method, url } = req;
    const start = Date.now();

    // Log the incoming request
    logger.info(`Incoming Request: ${method} ${url}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`Response: ${method} ${url} - ${res.statusCode} [${duration}ms]`);
    });

    next();
});

app.use('/auth', authRouter);
export default app;