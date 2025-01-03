import {Router} from "express";
import {changeName, changePassword} from "../controllers/user.controller.js";
const userRouter = new Router();

userRouter.post('/updateName', changeName);
userRouter.post('/updatePassword', changePassword);
userRouter.get('/test', (req, res) => {
    res.json({message: "Hellow"})
});

export default userRouter;