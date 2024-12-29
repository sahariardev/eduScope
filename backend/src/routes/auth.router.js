import {Router} from "express";
import {login, signUp} from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);

export default authRouter;