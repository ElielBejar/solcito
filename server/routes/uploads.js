import {Router} from "express";
import {UploadsController} from "../controllers/uploads.js";
import multer from "multer";
const upload = multer({ dest:"uploads/"});

export const uploadsRouter = Router();

uploadsRouter.post("/", upload.single('img'), UploadsController.uploadImg);