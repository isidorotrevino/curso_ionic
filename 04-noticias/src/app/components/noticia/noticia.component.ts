import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../interfaces/interfaces';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController, Platform, ToastController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from '../../services/data-local.service';


@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

    @Input() noticia: Article;

    @Input() i = 0;

    @Input() enFavoritos;

    constructor(private iap: InAppBrowser, private actionSheetCtrl: ActionSheetController,
                private socialShr: SocialSharing, private dataLocalSrv: DataLocalService,
                private toastCtrl: ToastController,
                private platform: Platform) {
    }

    ngOnInit() {
    }

    abrirNoticia() {
        console.log('Noticia ', this.noticia.url);
        const browser = this.iap.create(this.noticia.url, '_system');

    }

    async presentarToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    async lanzarMenu() {
        let guardarBorrarBtn;
        if (this.enFavoritos) {
            guardarBorrarBtn = {
                text: 'Borrar Favorito',
                icon: 'trash',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorite clicked');
                    this.dataLocalSrv.guardarNoticia(this.noticia);
                    this.presentarToast('Se borró favorito');
                }
            };
        } else {
            guardarBorrarBtn = {
                text: 'Favorito',
                icon: 'star',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorite clicked');
                    this.dataLocalSrv.borrarNoticia(this.noticia);
                    this.presentarToast('Se agregó favorito');
                }
            };
        }

        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [{
                text: 'Compartir',
                icon: 'share',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Share clicked');
                    this.compartirNoticia();
                }
            }, guardarBorrarBtn, {
                text: 'Cancelar',
                icon: 'close',
                cssClass: 'action-dark',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    compartirNoticia() {
        if (this.platform.is('cordova')) {
            this.socialShr.share(
                this.noticia.title,
                this.noticia.source.name,
                '',
                this.noticia.url
            );
        } else if (navigator['share']) {
            navigator['share'] ({
                title: this.noticia.title,
                text: this.noticia.source.name,
                url: this.noticia.url
            }).then(() => console.log('Successful Share')).catch((error) => console.log('Error sharing ', error));
        } else{
            console.log('No se pudo compartir');
        }

    }
}
