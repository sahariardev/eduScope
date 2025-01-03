import {findAllUser} from "../services/user.service.js";
import logger from "../services/logger.service.js";

export const userList = async (req, res) => {
    try {
        const user = await findAllUser();
        res.status(201).json(user);
    } catch (error) {
        logger.error(`Error : ${error.message}`);
        res.status(500).json({message: 'failed to fetch user list'});
    }
}