import {renameSync} from "node:fs";

function saveImg(type, file){
    const newPath = `./uploads/${type}/${file.originalname}`;
    renameSync(file.path, newPath);
    return newPath;
}

export class UploadsController{

    static async uploadImg(req, res){
       saveImg(req.params.type, req.file);
       res.send("imagen agregada con exito");
    }
}