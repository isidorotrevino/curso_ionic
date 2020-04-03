import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.page.html',
    styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

    titulo  = 'Alert Page';

    constructor(private alertCtrl: AlertController) {
    }

    ngOnInit() {
    }


    async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: 'Ok',
                handler: (blah) => {
                    console.log('Confirm Ok');
                }
            }
            ]
        });

        await alert.present();
    }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Como te llamas!',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          id: 'nombre-id',
          value: '',
          placeholder: 'Escribe tu nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ( data ) => {
            console.log('Confirm Ok', data);
            this.titulo = data.nombre;
          }
        }
      ]
    });

    await alert.present();
  }


}
