import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.page.html',
    styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

    loading: any;

    constructor(private loadingController: LoadingController) {
    }

    ngOnInit() {
        this.presentLoading('Espere');

        setTimeout(() => {
          this.loading.dismiss();
        }, 1500);
    }

    async presentLoading(msg: string) {
        this.loading = await this.loadingController.create({
            message: msg,
            // duration: 2000
        });
        return this.loading.present();

        // const {role, data} = await loading.onDidDismiss();
        // console.log('Loading dismissed!');
    }

    async presentLoadingWithOptions() {
        const loading = await this.loadingController.create({
            spinner: null,
            duration: 5000,
            message: 'Click the backdrop to dismiss early...',
            translucent: true,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();
        console.log('Loading dismissed with role:', role);
    }

}
