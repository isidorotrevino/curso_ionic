import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.page.html',
    styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

    @ViewChild(IonSegment, {static: true}) segment: IonSegment;

    superheroes: Observable<any>;

    publisher = '';

    constructor(private dataSrv: DataService) {
    }

    ngOnInit() {
        this.segment.value = 'todos';
        this.superheroes = this.dataSrv.getSuperheroes();
    }

    segmentChange($event: CustomEvent) {

        const valorSegmento = $event.detail.value;
        console.log(valorSegmento);
        if (valorSegmento === 'todos') {
            this.publisher = '';
            return;
        }
        this.publisher = valorSegmento;

    }
}
