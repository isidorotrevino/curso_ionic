import {EventEmitter, Injectable} from '@angular/core';
import {OneSignal, OSNotificationPayload, OSNotification} from '@ionic-native/onesignal/ngx';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class PushService {

    mensajes: OSNotificationPayload[] = [];

    pushListener  = new EventEmitter<OSNotificationPayload>();

    userId: string;

    constructor(private oneSignal: OneSignal, private storage: Storage) {
        this.cargarMensajes();
    }

    async getMensajes(){
        await this.cargarMensajes();
        return [...this.mensajes];
    }

    configuracionInicial() {
        this.oneSignal.startInit('cf8d9162-761a-491a-b76f-92ff86b456d0', '570126582067');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            console.log('Notificación recibida ', noti);
            this.notificacionRecibida(noti);
        });

        this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
            console.log('Notificación abierta ', noti);
            await this.notificacionRecibida(noti.notification);
        });

        this.oneSignal.getIds().then( info => {
           this.userId = info.userId;
        });

        this.oneSignal.endInit();
    }

    async notificacionRecibida(noti: OSNotification) {

        await this.cargarMensajes();

        const payload = noti.payload;
        const existePush = this.mensajes.find(msg => msg.notificationID === payload.notificationID);
        if (existePush) {
            return;

        }
        this.mensajes.unshift(payload);
        this.pushListener.emit(payload);

        this.guardarMensajes();

    }

    guardarMensajes() {
        this.storage.set('mensajes', this.mensajes);
    }

    async cargarMensajes(){
        this.mensajes = await this.storage.get('mensajes') || [];

        return this.mensajes;
    }

    async borrarMensajes(){
        await this.storage.remove('mensajes');
        this.mensajes = []
        this.guardarMensajes();
    }
}
