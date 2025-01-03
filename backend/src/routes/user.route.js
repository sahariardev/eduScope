import {Router} from "express";
import {changeName, changePassword} from "../controllers/user.controller.js";
import {adminChecker} from "../middleware/admin.middleware.js";
import {userList} from "../controllers/user.admin.controller.js";
const userRouter = new Router();

userRouter.post('/updateName', changeName);
userRouter.post('/updatePassword', changePassword);
userRouter.get('/userList', adminChecker, userList);

export default userRouter;