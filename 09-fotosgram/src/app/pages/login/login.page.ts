import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonSlides} from '@ionic/angular';
import {UsuarioService} from '../../services/usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    @ViewChild('slidePrincipal', {static: true}) slidePrincipal: IonSlides;

    avatars = [
        {
            img: 'av-1.png',
            seleccionado: true
        },
        {
            img: 'av-2.png',
            seleccionado: false
        },
        {
            img: 'av-3.png',
            seleccionado: false
        },
        {
            img: 'av-4.png',
            seleccionado: false
        },
        {
            img: 'av-5.png',
            seleccionado: false
        },
        {
            img: 'av-6.png',
            seleccionado: false
        },
        {
            img: 'av-7.png',
            seleccionado: false
        },
        {
            img: 'av-8.png',
            seleccionado: false
        },
    ];

    avatarSlide = {
        slidesPerView: 3
    };

    loginUser = {email: 'juan.perez@gmail.com', password: 'prueba'};

    constructor(private usuarioSrv: UsuarioService) {
    }

    ngOnInit() {
        this.slidePrincipal.lockSwipes(true);
    }

    login(fLogin: NgForm) {
        console.log(fLogin.valid);
        if (fLogin.invalid) {
            return;
        }
        this.usuarioSrv.login(this.loginUser.email, this.loginUser.password);
    }

    registro(fRegistro: NgForm) {
        console.log(fRegistro.valid);
    }

    seleccionarAvatar(avatar) {
        this.avatars.forEach(av => av.seleccionado = false);
        avatar.seleccionado = true;
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
