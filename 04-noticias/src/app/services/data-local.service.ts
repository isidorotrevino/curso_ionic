import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Article} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    noticias: Article[] = [];

    constructor(private storage: Storage) {
    }

    guardarNoticia(noticia: Article) {
        const existe = this.noticias.find(noti => noticia.title === noti.title);

        if (!existe) {
            this.noticias.unshift(noticia);
            this.storage.set('favoritos', this.noticias);
        }


    }

    async cargarFavoritos() {
        /*this.storage.get('favoritos').then(favoritos => {
            console.log('favoritos ', favoritos);
        }); */
        const favoritos = await this.storage.get('favoritos');
        if (favoritos) {
            this.noticias = favoritos;
        } else {
            this.noticias = [];
        }
        return this.noticias;
    }

    borrarNoticia(noticia: Article) {
        this.noticias = this.noticias.filter(cond =>
            cond.title !== noticia.title
        );
        this.storage.set('favoritos', this.noticias);
    }
}
