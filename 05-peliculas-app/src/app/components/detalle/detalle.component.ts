import {Component, Input, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {PeliculaActores, PeliculaDetalle} from '../../interfaces/interfaces';
import {ModalController} from '@ionic/angular';
import {DataLocalService} from '../../services/data-local.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    pelicula: PeliculaDetalle = {};
    actores: PeliculaActores = {};
    cortar = 150;
    @Input() id: string;
    slideOptPoster: {
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: -5
    };
    estrella = 'star-outline';

    constructor(private movieSrv: MoviesService,
                private modalCtrl: ModalController, private dataLocalSrv: DataLocalService) {
    }

    async ngOnInit() {
        const existe = await this.dataLocalSrv.existePelicula(this.id);

        this.estrella = existe ? 'star' : 'star-outline';

        this.movieSrv.getPeliculaDetalle(this.id).subscribe(resp => {
            this.pelicula = resp;
        });
        this.movieSrv.getActores(this.id).subscribe(resp => {
            this.actores = resp;
        });
    }

    regresar() {
        this.modalCtrl.dismiss();
    }

    async favorito() {
        const existe = await this.dataLocalSrv.guardarPelicula(this.pelicula);
        this.estrella = !existe ? 'star' : 'star-outline';
    }
}
