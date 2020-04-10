import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Pelicula, RespuestaMDB} from '../interfaces/interfaces';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Pelicula[] = [];

    populares: Pelicula[] = [];

    pagPopular = 1;

    constructor(private movieSrv: MoviesService) {
    }

    ngOnInit(): void {
        this.movieSrv.getFeatured().subscribe((respuesta: RespuestaMDB) => {
            console.log('Respuesta ', respuesta);
            this.peliculasRecientes = respuesta.results;
        });
        this.cargarPopulares();
    }


    cargarMas() {
        this.cargarPopulares();
    }

    cargarPopulares() {
        this.movieSrv.getPopular(this.pagPopular++).subscribe(resp => {
            console.log('Populares ', resp);
            const arrTemp = [...this.populares, ...resp.results];
            this.populares = arrTemp;
        });
    }
}
