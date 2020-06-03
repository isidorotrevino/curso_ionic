"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usuario_model_1 = require("../models/usuario.model");
var bcrypt_1 = require("bcrypt");
var token_1 = require("../classes/token");
var autenticacion_1 = require("../middleware/autenticacion");
var userRoutes = express_1.Router();
//Login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
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
            var tokenUser = token_1["default"].getJWTToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario / contraseña incorrectas *'
            });
        }
    });
});
//Crear usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1["default"].hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var tokenUser = token_1["default"].getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            userDB: userDB,
            token: tokenUser,
            mensaje: 'Usuario creado'
        });
    })["catch"](function (err) {
        res.json({
            ok: false,
            mensaje: err.message
        });
    });
});
//Actualizar usuario
userRoutes.post('/update', [autenticacion_1.verificaToken], function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate({ _id: req.usuario._id }, user, { "new": true }, function (err, userDB) {
        if (err) {
            console.log('Error ', err);
            throw err;
        }
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Ya no existe el usuario'
            });
        }
        var tokenUser = token_1["default"].getJWTToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            userDB: userDB,
            token: tokenUser,
            mensaje: 'Usuario actualizado '
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
exports["default"] = userRoutes;
