import Server from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose, {mongo} from 'mongoose';
import bodyParser from "body-parser";
import postRoutes from "./routes/post";
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//FileUpload
server.app.use(fileUpload({useTempFiles: true}));

//CORS
server.app.use(cors({origin: true, credentials: true}));

//Rutas
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


//Conectar DB
mongoose.connect('mongodb://127.0.0.1:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    user: 'root',
    pass: 'example',
    authSource: "admin"
}, (err) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online');
});


server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);


});
