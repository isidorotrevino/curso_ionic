import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonSlides, NavController} from '@ionic/angular';
import {UsuarioService} from '../../services/usuario.service';
import {UiServiceService} from '../../services/ui-service.service';
import {Usuario} from '../../interfaces/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


    @ViewChild('slidePrincipal', {static: true}) slidePrincipal: IonSlides;




    loginUser = {email: 'juan.perez@gmail.com', password: 'prueba'};

    registerUser: Usuario = {
        email: 'test@test.com',
        password: '123456',
        nombre: 'Test',
        avatar: 'av-1.png'
    };

    constructor(private usuarioSrv: UsuarioService, private navCtrl: NavController, private uiSrv: UiServiceService) {
    }

    ngOnInit() {
        this.slidePrincipal.lockSwipes(true);
    }

    async login(fLogin: NgForm) {
        console.log(fLogin.valid);
        if (fLogin.invalid) {
            return;
        }
        const valido = await this.usuarioSrv.login(this.loginUser.email, this.loginUser.password);
        if (valido) {
            this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        } else {
            this.uiSrv.alertaInformativa('Usuario y/o contraseña incorrectos');
        }
    }

    async registro(fRegistro: NgForm) {
        if (!fRegistro.valid) {
            return;
        }
        const valido = await this.usuarioSrv.registro(this.registerUser);
        if (valido) {
            this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        } else {
            this.uiSrv.alertaInformativa('Ocurrió un error al crear usuario');
        }
    }



    mostrarLogin() {
        this.slidePrincipal.lockSwipes(false);
        this.slidePrincipal.slideTo(1);
        this.slidePrincipal.lockSwipes(true);
    }

    mostrarRegistro() {
        this.slidePrincipal.lockSwipes(false);
        this.slidePrincipal.slideTo(0);
        this.slidePrincipal.lockSwipes(true);
    }
}
