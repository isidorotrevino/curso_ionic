import {ApplicationRef, Component, OnInit} from '@angular/core';
import {PushService} from '../services/push.service';
import {OSNotificationPayload} from '@ionic-native/onesignal';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    mensajes: OSNotificationPayload[] = [];

    constructor(public pushSrv: PushService,
                private applicationRef: ApplicationRef) {

    }

    ngOnInit(): void {
        this.pushSrv.pushListener.subscribe(noti => {
            this.mensajes.unshift(noti);
            this.applicationRef.tick();

        });
    }

    async ionViewWillEnter() {
        console.log('Will enter, cargar mensajes');
        console.log('User id', this.pushSrv.userId);
        this.mensajes = await this.pushSrv.getMensajes();
    }

    async eliminar() {
        await this.pushSrv.borrarMensajes();
        this.mensajes = [];
    }
}
