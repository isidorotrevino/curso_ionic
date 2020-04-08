import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {NoticiasService} from '../../services/noticias.service';
import {Article, RespuestaTopHeadlines} from '../../interfaces/interfaces';
import {not} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


    categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    noticias: Article[] = [];

    noticiaActual = '';

    @ViewChild(IonSegment, {static: true}) segment: IonSegment;

    constructor(private noticiasSrv: NoticiasService) {

    }

    ngOnInit(): void {
        this.segment.value = this.categorias[0];
        this.cargarNoticias(this.categorias[0]);
    }

    cambiarCategoria($event: CustomEvent) {
        this.noticias = [];

        this.noticiaActual = $event.detail.value;

        this.cargarNoticias(this.noticiaActual);
    }

    cargarNoticias(noticia: string) {


        this.noticiasSrv.getTopHeadlinesCategoria(noticia).subscribe(resp => {
            console.log('Noticia ', resp);
            this.noticias.push(...resp.articles);
        });
    }

    loadData(event) {
        this.cargarNoticias(this.noticiaActual);

        if (event) {
            event.target.complete();
        }
    }
}
