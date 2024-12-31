import express from 'express'
import cors from 'cors'
import authRouter from "./routes/auth.router.js";
import logger from "./services/logger.service.js";
import {verifyToken} from "./middleware/verifyToken.middleware.js";
import userRoute from "./routes/user.route.js";

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
app.use('/app', verifyToken)
app.use('/app/user', userRoute);
export default app;