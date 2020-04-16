import {Component} from '@angular/core';
import {DataLocalService} from '../../services/data-local.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(public dataLocalSrv: DataLocalService) {
    }

    enviarCorreo() {
        console.log('Enviando correo');
        this.dataLocalSrv.enviarCorreo();
    }

    abrirRegistro(registro) {
        console.log('Registro ', registro);
        this.dataLocalSrv.abrirRegistro(registro);
    }
}
