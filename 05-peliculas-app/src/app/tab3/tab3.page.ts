import {Component, OnInit} from '@angular/core';
import {Pelicula, PeliculaDetalle} from '../interfaces/interfaces';
import {DataLocalService} from '../services/data-local.service';
import {MoviesService} from '../services/movies.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    pelisFavoritas: PeliculaDetalle[] = [];
    generos: any[] = [];
    peliGeneros: any = {};

    constructor(private dataLocalSrv: DataLocalService, private movieSrv: MoviesService) {
    }

     ngOnInit() {
       // this.recargarFavoritos();
    }

    ionViewWillEnter(){
        this.recargarFavoritos();
    }

    async recargarFavoritos(){
        this.pelisFavoritas = await this.dataLocalSrv.cargarFavoritos();
        this.generos = await this.movieSrv.cargarGeneros();
        // tslint:disable-next-line:forin
        console.log('Generos ', this.generos);
        this.generos.forEach( gens => {
            this.peliGeneros[gens['name']] = this.pelisFavoritas.filter(p => {
                if (!p.genres) {
                    return false;
                }
                const t = p.genres.find(g => g.id === gens['id']);
                console.log('t', t, gens, p.genres);
                return (t) ? true : false;
            });
        });
    }

    /*pelisPorGenero(genId: number){
        return this.pelisFavoritas.filter( p => p.genres.find(g => g.id === genId ));
    }*/
}
