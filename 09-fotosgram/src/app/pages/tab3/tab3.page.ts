import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../interfaces/interfaces';
import {UsuarioService} from '../../services/usuario.service';
import {NgForm} from '@angular/forms';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    usuario: Usuario = {};

    constructor(private usuarioSrv: UsuarioService, private uiSrv: UiServiceService) {
    }

    logout() {

    }

    ngOnInit(): void {
        this.usuario = this.usuarioSrv.getUsuario();
        console.log(this.usuario);
    }

    async actualizar(fActualizar: NgForm) {
        if (fActualizar.invalid) {
            return;
        }
        const actualizado = await this.usuarioSrv.actualizarUsuario(this.usuario);
        console.log(actualizado);
        if (actualizado) {
            this.uiSrv.presentToast('Usuario Actualizado');
        } else {
            this.uiSrv.presentToast('No se pudo');
        }
    }
}
