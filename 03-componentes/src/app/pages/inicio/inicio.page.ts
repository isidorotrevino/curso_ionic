import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {Componente} from '../../interfaces/interfaces';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    componentes: Observable<Componente[]>;

    constructor(private menuCtrl: MenuController, private dataSrv: DataService) {
    }

    ngOnInit() {
        this.componentes = this.dataSrv.getMenuOpts();
    }

    toggleMenu() {
        this.menuCtrl.toggle();
    }
}


