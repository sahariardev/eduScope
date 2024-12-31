import bcrypt from "bcrypt";
import {generateJWTAndSetToCookie} from "../util/jwt.util.js";
import {findUserByEmail, saveUser} from "../services/user.service.js";
import User from "../models/user.model.js";
import logger from "../services/logger.service.js";

export const signUp = async (req, res) => {
    try {
        const {email, name, password} = req.body;

        const userFromDB = await findUserByEmail(email);

        if (userFromDB) {
            res.status(401).json({message: 'User with this email already exist'});
            return;
        }

        let user = new User(null, email, name, await bcrypt.hash(password, 10))
        user = await saveUser(user);

        generateJWTAndSetToCookie(user.id, user.email, res);
        res.status(201).json({message: 'User created'});
    } catch (error) {
        logger.error(`Error : ${error.message}`);
        res.status(500).json({message: 'User login failed'});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            res.status(401).json({message: 'User with this email doesnot exists!'});
            return;
        }

        if (!await bcrypt.compare(password, user.password)) {
            res.status(401).json({message: 'Auth failed!'});
            return;
        }

        const token = generateJWTAndSetToCookie(user.id, user.email, res);
        res.status(201).json({token: token});
    } catch (error) {

        logger.error(`Error : ${error.message}`);
        res.status(500).json({message: 'User login failed'});
    }
}