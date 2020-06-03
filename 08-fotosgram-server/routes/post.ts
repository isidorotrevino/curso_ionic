import {Response, Router} from "express";
import {verificaToken} from "../middleware/autenticacion";
import {Post} from "../models/post.model";
import {FileUpload} from "../interfaces/file-upload";
import FileSystem from "../classes/filesystem";
import * as fs from "fs";



const postRoutes = Router();
const filesystem = new FileSystem();
postRoutes.post('/',[verificaToken],(req:any,res:Response)=>{
    const body = req.body;
    body.usuario = req.usuario._id;
    const imagenes = filesystem.imagenesDeTempAPost(req.usuario._id);
    body.imagenes = imagenes;
    Post.create(body).then( async postDB=>{
        await postDB.populate('usuario','-password').execPopulate();
        res.json({ok:true,
            post:postDB}) ;
    }).catch(err=>{
        res.json(err);
    });

});

postRoutes.get('/',[verificaToken], async (req:any,res:Response)=>{
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip *= 10;

    const posts = await Post.find()
        .sort({_id: -1})
        .skip(skip)
        .limit(10)
        .populate('usuario','-password')
        .exec();
    res.json({ok:true, posts, pagina});
});

 postRoutes.post('/upload',[verificaToken],async (req:any,res:Response)=>{

    if(!req.files){
        return res.status(400).json({
           ok: false,
           mensaje: 'No hay archivos'
        });
    }

    const file: FileUpload = req.files.image;
    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'No hay archivos'
        });
    }
    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            mensaje: 'No es imagen'
        });
    }

    await filesystem.guardarImagenTemporal(file, req.usuario._id);


    res.json({
       ok: true,
        file: file.mimetype
    });

});

postRoutes.get('/imagen/:userId/:img', (req:any,res:Response)=>{
   const userId = req.params.userId;
   const img = req.params.img;

   const pathFoto = filesystem.getFotoUrl(userId,img);
    var readStream = fs.createReadStream(pathFoto);
    readStream.pipe(res);

});

export default postRoutes;
