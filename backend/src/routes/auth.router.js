import {Router} from "express";
import {signUp} from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post('/signup', signUp);

export default authRouter;