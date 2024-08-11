import {renameSync, unlinkSync} from "node:fs";
import {basename} from "node:path";

function saveImg(type, file){
    const newPath = `./src/public/uploads/${type}/${file.originalname}`;
    renameSync(file.path, newPath);
    return newPath;
}

export class UploadsController{

    static async uploadImg(req, res){
       saveImg(req.params.type, req.file);
       res.send("imagen agregada con exito");
    }

    static async deleteImg(req, res){
        let realPath = `./src/public/uploads/${req.params.type}/${req.params.imgName}`;
        try {
            unlinkSync(realPath);
            res.json("imagen borrada con éxito");
          } catch (err) {
            console.log(err);
          }
    }
}