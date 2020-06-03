"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var uniqid_1 = require("uniqid");
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var path = _this.crearCarpetaUsuario(userId);
            var nombreArchivo = _this.generarNombreUnico(file.name);
            console.log(nombreArchivo);
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.imagenesDeTempAPost = function (userId) {
        var pathTemp = path_1["default"].resolve(__dirname, '../uploads/', userId + '/temp');
        var pathPost = path_1["default"].resolve(__dirname, '../uploads/', userId + '/post');
        if (!fs_1["default"].existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1["default"].existsSync(pathPost)) {
            fs_1["default"].mkdirSync(pathPost);
        }
        var imagenesTemp = this.obtenerImagenesTemp(userId, pathTemp);
        imagenesTemp.forEach(function (img) {
            fs_1["default"].renameSync(pathTemp + "/" + img, pathPost + "/" + img);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.getFotoUrl = function (userId, img) {
        var pathFoto = path_1["default"].resolve(__dirname, '../uploads/', userId, 'post', img);
        var existe = fs_1["default"].existsSync(pathFoto);
        if (!existe) {
            path_1["default"].resolve(__dirname, '../assets/original.jpg');
        }
        return pathFoto;
    };
    FileSystem.prototype.obtenerImagenesTemp = function (userId, pathTemp) {
        return fs_1["default"].readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1];
        var idUnico = uniqid_1["default"]();
        return idUnico + '.' + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1["default"].resolve(__dirname, '../uploads/', userId);
        var pathTemp = pathUser + '/temp';
        console.log(pathUser);
        var existe = fs_1["default"].existsSync(pathUser);
        if (!existe) {
            fs_1["default"].mkdirSync(pathUser);
            fs_1["default"].mkdirSync(pathTemp);
        }
        return pathTemp;
    };
    return FileSystem;
}());
exports["default"] = FileSystem;
