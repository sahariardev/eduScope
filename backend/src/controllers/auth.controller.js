import bcrypt from "bcrypt";
import {generateJWTAndSetToCookie} from "../util/jwt.util.js";

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            res.status(401).json({message: 'Username doesnot exists!'});
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