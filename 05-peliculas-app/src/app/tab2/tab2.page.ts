import {Component} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Pelicula} from '../interfaces/interfaces';
import {ModalController} from '@ionic/angular';
import {DetalleComponent} from '../components/detalle/detalle.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    peliculas: Pelicula[] = [];
    textoBuscar = '';
    ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillo', 'La vida es bella'];
    buscando = false;

    constructor(private movieSrv: MoviesService, private modalCtrl: ModalController) {
    }

    buscar($event: CustomEvent) {
        const valor = $event.detail.value;
        if (valor !== '') {
            this.buscando = true;
            this.movieSrv.buscarPeliculas(valor).subscribe(resp => {
                this.peliculas = resp.results;
                this.buscando = false;
            });
        } else {
            this.buscando = false;
            this.peliculas = [];
        }
    }

    sugerir(idea) {
        this.textoBuscar = idea;
    }

    async mostrarDetalle(id: string) {
        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id
            }
        });
        modal.present();
    }
}
