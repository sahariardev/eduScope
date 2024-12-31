import {Router} from "express";
import {changeName, changePassword} from "../controllers/user.controller.js";
const authRouter = new Router();

authRouter.post('/updateName', changeName);
authRouter.post('/updatePassword', changePassword);

export default authRouter;