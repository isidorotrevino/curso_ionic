import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PeliculaActores, PeliculaDetalle, RespuestaMDB} from '../interfaces/interfaces';

const URL = environment.url;
const API_KEY = environment.apiKey;


@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    generos: any[] = [];

    constructor(private httpClient: HttpClient) {
    }

    private ejecutarQuery<T>(query: string) {
        query = URL + query;
        query += `&api_key=${API_KEY}&language=es&include_image_language=es`;
        console.log('Query ', query);
        return this.httpClient.get<T>(query);
    }

    getFeatured() {
        const hoy = new Date();
        const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
        const mes = hoy.getMonth() + 1;
        const mesString = mes < 10 ? '0' + mes : mes;
        const año = hoy.getFullYear();

        const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${año}-${mesString}-01&primary_release_date.lte=${año}-${mesString}-${ultimoDia}`);
    }

    getPopular(pag: number) {
        const query = `/discover/movie?sort_by=popularity.desc&page=${pag}`;
        return this.ejecutarQuery<RespuestaMDB>(query);
    }

    getPeliculaDetalle(id: string) {
        return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
    }

    getActores(id: string) {
        return this.ejecutarQuery<PeliculaActores>(`/movie/${id}/credits?a=1`);
    }

    buscarPeliculas(texto: string) {
        return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
    }

    cargarGeneros(): Promise<any[]> {
        return new Promise(resolve => {
            this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp => {
                this.generos = resp['genres'];
                resolve(this.generos);
            });
        });

    }
}
