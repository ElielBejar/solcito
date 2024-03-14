import {renameSync} from "node:fs";

function saveImg(file){
    const newPath = `./uploads/${file.originalname}`;
    renameSync(file.path, newPath);
    return newPath;
}

export class UploadsController{

    static async uploadImg(req, res){
       saveImg(req.file);
       res.send("imagen agregada con exito");
    }
}