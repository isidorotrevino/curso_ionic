import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png',
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
});

usuarioSchema.method('compararPassword', function (pass: string = ''): boolean {
    if (bcrypt.compareSync(pass, this.password)) {
        return true;
    } else{
        return false;
    }

});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    compararPassword(pass:string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);


