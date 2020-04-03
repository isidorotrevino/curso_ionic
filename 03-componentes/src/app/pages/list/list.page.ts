import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {IonList, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    @ViewChild('lista', {static: false}) lista: IonList;

    usuarios: Observable<any>;

    constructor(private dataService: DataService, private toastCtrl: ToastController) {
    }

    async presentToast(msg: string ) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    ngOnInit() {
        this.usuarios = this.dataService.getUsers();
    }

    favorite(item: any) {
        console.log('favorite ', item);
        this.presentToast('Favorite');
        this.lista.closeSlidingItems();
    }

    share(item: any) {
        console.log('share ', item);
        this.presentToast('Se compartío');
        this.lista.closeSlidingItems();
    }

    delete(item: any) {
        console.log('delete ', item);
        this.presentToast('Pos se borró');
    }
}
