import {findUserByEmail, updateUser} from "../services/user.service.js";
import bcrypt from "bcrypt";
import logger from "../services/logger.service.js";

export const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        const user = await findUserByEmail(req.userEmail);

        if (!user) {
            res.status(401).json({message: 'User with this email doesnot exists!'});
            return;
        }

        if (!await bcrypt.compare(oldPassword, user.password)) {
            res.status(401).json({message: 'Old password incorrect!'});
            return;
        }

        await updateUser(user.id, {
            password: newPassword
        });

        res.status(201).json({message: 'Password updated successfully'});
    } catch (error) {
        logger.error(`Error : ${error.message}`);
        res.status(500).json({message: 'password updated failed'});
    }
}

export const changeName = async (req, res) => {
    try {
        const {name} = req.body;

        const user = await findUserByEmail(req.userEmail);

        if (!user) {
            res.status(401).json({message: 'User with this email doesnot exists!'});
            return;
        }

        await updateUser(user.id, {
            name: name
        });

        res.status(201).json({message: 'name updated successfully'});
    } catch (error) {
        logger.error(`Error : ${error.message}`);
        res.status(500).json({message: 'name update failed'});
    }
}