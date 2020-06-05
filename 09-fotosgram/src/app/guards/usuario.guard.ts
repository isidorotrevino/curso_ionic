import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioGuard  {

    constructor(private usuarioSrv: UsuarioService) {

    }

    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
        return this.usuarioSrv.validaToken();
    }

}
