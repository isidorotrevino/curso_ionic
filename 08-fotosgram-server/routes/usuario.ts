import {Request, Response, Router} from "express";
import {Usuario} from "../models/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import {verificaToken} from "../middleware/autenticacion";

const userRoutes = Router();
//Login
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña incorrectas'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = Token.getJWTToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña incorrectas *'
            });
        }
    })

});

//Crear usuario
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }
    Usuario.create(user).then(userDB => {
        const tokenUser = Token.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            userDB,
            token: tokenUser,
            mensaje: 'Usuario creado'
        });
    }).catch(err => {
        res.json({
            ok: false,
            mensaje: err.message
        });
    });


});

//Actualizar usuario
userRoutes.post('/update', [verificaToken], (req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    Usuario.findByIdAndUpdate({_id:req.usuario._id}, user,{new: true}, (err, userDB )=>{
       if(err) {
           console.log('Error ',err);
           throw err;
       }
       if( !userDB){
           return res.json({
               ok:false,
               mensaje: 'Ya no existe el usuario'
           });
       }
        const tokenUser = Token.getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            userDB,
            token: tokenUser,
            mensaje: 'Usuario actualizado '
        });
    });
});

userRoutes.get('/', [verificaToken], (req: any, res: Response) => {
    const usuario = req.usuario;
    res.json({
        ok:true,
        usuario
    })
});

export default userRoutes;
