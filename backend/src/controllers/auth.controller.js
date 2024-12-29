import bcrypt from "bcrypt";
import {generateJWTAndSetToCookie} from "../util/jwt.util.js";
import {findUserByEmail, saveUser} from "../services/user.service.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
    try {
        const {email, name, password} = req.body;

        const userFromDB = await findUserByEmail(email);

        if (userFromDB) {
            res.status(401).json({message: 'User with this email already exist'});
            return;
        }

        let user = new User(null, email, name, bcrypt.hash(password, 10))
        user = await saveUser(user);

        generateJWTAndSetToCookie(user.id, res);
        res.status(201).json({message: 'User created'});
    } catch (error) {
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

        generateJWTAndSetToCookie(user._id, res);
        res.status(201).json({message: 'User created'});
    } catch (error) {
        console.log('error occuered', error);
        res.status(500).json({message: 'User login failed'});
    }
}