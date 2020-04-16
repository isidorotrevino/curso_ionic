import {Injectable} from '@angular/core';
import {Registro} from '../models/registro.model';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {File} from '@ionic-native/file/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    guardados: Registro[] = [];


    constructor(private storage: Storage, private navCtrl: NavController,
                private browser: InAppBrowser, private file: File,
                private emailCpsr: EmailComposer) {
        this.cargarRegistros();
    }

    async cargarRegistros() {
        this.guardados = (await this.storage.get('registros')) || [];
    }

    guardarRegistro(format: string, text: string) {
        const nuevoRegistro = new Registro(format, text);
        this.guardados.unshift(nuevoRegistro);
        console.log(this.guardados);
        this.storage.set('registros', this.guardados);

        this.navCtrl.navigateForward('/tabs/tab2');
    }

    async abrirRegistro(registro: Registro) {
        this.navCtrl.navigateForward('/tabs/tab2');

        switch (registro.type) {
            case 'http':
                const br = await this.browser.create(registro.texto, '_system');
                br.show();
                break;
            case 'geo':
                this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.texto}`);
                break;
        }
    }

    enviarCorreo() {
        const titulos = 'Tipo, Formato, Creado en, Texto\n';
        const arrTemp = [];
        arrTemp.push(titulos);
        this.guardados.forEach(registro => {
            const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.texto.replace(',', ' ')}\n`;
            arrTemp.push(linea);
        });

        this.crearArchivo(arrTemp.join(''));
    }

    crearArchivo(texto: string) {
        this.file.checkFile(this.file.dataDirectory, 'registros.csv')
            .then(existe => {
                console.log('Existe archivo? ', existe);
                return this.escribirEnArchivo(texto);
            }).catch(err => {
            return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
                .then(creado => this.escribirEnArchivo(texto))
                .catch(err2 => console.log('No se pudo ', err2));
        });
    }

    async escribirEnArchivo(texto: string) {
        await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', texto);

        console.log('Archivo creado ', this.file.dataDirectory);
        const arch = this.file.dataDirectory + 'registros.csv';
        this.emailCpsr.isAvailable().then((available: boolean) => {
            if (available) {
                const email = {
                    to: 'chololo@gmail.com',
                    /*cc: 'erika@mustermann.de',
                    bcc: ['john@doe.com', 'jane@doe.com'],
                     */
                    attachments: [
                        /* 'file://img/logo.png',
                         'res://icon.png',
                         'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
                         'file://README.pdf'*/
                        arch
                    ],
                    subject: 'Backup de scans',
                    body: 'Aquí están los backups',
                    isHtml: true
                };

// Send a text message using default options
                this.emailCpsr.open(email);
            }
        });
    }
}
