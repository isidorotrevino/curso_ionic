import {FileUpload} from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() {

    }

    guardarImagenTemporal(file: FileUpload, userId: string) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario(userId);

            const nombreArchivo = this.generarNombreUnico(file.name);

            console.log(nombreArchivo);

            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });


    }

    imagenesDeTempAPost(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId+'/temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId+'/post');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }
        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesTemp(userId, pathTemp);
        imagenesTemp.forEach(img => {
            fs.renameSync(`${pathTemp}/${img}`, `${pathPost}/${img}`);
        });
        return imagenesTemp;
    }

    getFotoUrl(userId: string, img: string){
        const pathFoto= path.resolve(__dirname, '../uploads/', userId, 'post',img);

        const existe = fs.existsSync(pathFoto);
        if(!existe){
            path.resolve(__dirname, '../assets/original.jpg');
        }
        return pathFoto;
    }

    private obtenerImagenesTemp(userId: string, pathTemp: string) {
        return fs.readdirSync(pathTemp) || [];
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniqid();
        return idUnico + '.' + extension;

    }

    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathTemp = pathUser + '/temp';
        console.log(pathUser);

        const existe = fs.existsSync(pathUser);
        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathTemp);
        }
        return pathTemp;
    }
}
