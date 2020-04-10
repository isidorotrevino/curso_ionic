import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {PeliculaDetalle} from '../interfaces/interfaces';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    peliculas: PeliculaDetalle[] = [];

    constructor(private storage: Storage, private toastCtrl: ToastController) {
        this.cargarFavoritos();
    }

    async guardarPelicula(pelicula: PeliculaDetalle) {
        let existe = false;
        let mensaje = '';
        for (const peli of this.peliculas) {
            if (peli.id === pelicula.id) {
                existe = true;
                break;
            }
        }
        if (!existe) {
            this.peliculas.push(pelicula);
            mensaje = 'Agregado a favoritos';
        } else {
            this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
            mensaje = 'Removido de favoritos';
        }
        this.storage.set('peliculas', this.peliculas);
        const toast = await this.toastCtrl.create({
            message: mensaje,
            duration: 1500
        });
        toast.present();
        return existe;
    }

    async cargarFavoritos() {
        const peliculas = await this.storage.get('peliculas');
        this.peliculas = peliculas || [];
        return this.peliculas;
    }

    async existePelicula(id) {
        id = Number(id);
        await this.cargarFavoritos();
        const existe = this.peliculas.find(peli => peli.id === id);
        return (existe) ? true : false;
    }
}
