import {rename, unlink} from "node:fs";
import {basename} from "node:path";

function saveImg(type, file){
    const newPath = `./src/public/uploads/${type}/${file.originalname}`;
    try{
    rename(file.path, newPath, (err)=>{
      if (err) {
        console.error('Error renaming file:', err);
        return;
      }
    });
    console.log('File renamed successfully');
    }catch(err){
      console.error('Error renaming file:', err);
    }
}

export class UploadsController{

    static async uploadImg(req, res){
       saveImg(req.params.type, req.file);
       res.json("imagen agregada con exito");
    }

    static async deleteImg(req, res){
        let realPath = `./src/public/uploads/${req.params.type}/${req.params.imgName}`;
        try {
            unlink(realPath);
            res.json("imagen borrada con éxito");
          } catch (err) {
            console.log(err);
          }
    }
}