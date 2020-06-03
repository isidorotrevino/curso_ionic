"use strict";
exports.__esModule = true;
var server_1 = require("./classes/server");
var usuario_1 = require("./routes/usuario");
var mongoose_1 = require("mongoose");
var body_parser_1 = require("body-parser");
var post_1 = require("./routes/post");
var express_fileupload_1 = require("express-fileupload");
var server = new server_1["default"]();
//Body parser
server.app.use(body_parser_1["default"].urlencoded({ extended: true }));
server.app.use(body_parser_1["default"].json());
//FileUpload
server.app.use(express_fileupload_1["default"]({ useTempFiles: true }));
//CORS
//Rutas
server.app.use('/user', usuario_1["default"]);
server.app.use('/posts', post_1["default"]);
//Conectar DB
mongoose_1["default"].connect('mongodb://127.0.0.1:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    user: 'root',
    pass: 'example',
    authSource: "admin"
}, function (err) {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port);
});
