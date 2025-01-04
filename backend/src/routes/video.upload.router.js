import express from "express";
import multer from 'multer'
import {completeUpload, initializeUpload, uploadChunk} from "../controllers/videoUpload.controller.js";

const uploadRouter = express.Router();
const upload = multer();

uploadRouter.post('/initialize', upload.none(), initializeUpload);
uploadRouter.post('/', upload.single('chunk'), uploadChunk);
uploadRouter.post('/complete', completeUpload);

export default uploadRouter;