import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {

    constructor(private alertCtrl: AlertController, private toastController: ToastController) {
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 1500,
            position: 'top'
        });
        toast.present();
    }

    async alertaInformativa(message: string) {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message,
            buttons: ['OK']
        });

        await alert.present();
    }
}
