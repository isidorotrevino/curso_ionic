import {Component} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {DataLocalService} from '../../services/data-local.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    slideOpts: { allowSlidePrev: false, allowSlideNext: false };

    constructor(private barcodeScanner: BarcodeScanner, private dataLocalSrv: DataLocalService) {
    }

    ionViewDidEnter() {
        console.log('Vista cargada');
    }

    ionViewDidLeave() {
        console.log('Vista descargada');
    }

    ionViewDidLoad() {
        console.log('Vista load');
    }

    ionViewWillEnter() {
        console.log('will enter');
        this.scan();
    }

    ionViewWillLeave() {
        console.log('will leave');
    }

    scan() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data ', barcodeData);
            if (!barcodeData.cancelled) {
                this.dataLocalSrv.guardarRegistro(barcodeData.format, barcodeData.text);
            }
        }).catch(err => {
            console.log('Error ', err);

            // this.dataLocalSrv.guardarRegistro('QRCode', 'https://www.google.com');
            this.dataLocalSrv.guardarRegistro('QRCode', 'geo:40.72839595774003,-73.7793482824219');
        });
    }
}
