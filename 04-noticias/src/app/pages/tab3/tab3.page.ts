import {Component, OnInit} from '@angular/core';
import {DataLocalService} from '../../services/data-local.service';
import {Article} from '../../interfaces/interfaces';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    noticias: Article[] = [];

    sliderOpts = {
      allowSlidePrev: false,
      allowSlideNext: false
    };

    constructor(private dataLocalSrv: DataLocalService) {

    }

    ngOnInit(): void {
        this.dataLocalSrv.cargarFavoritos().then(favs => {
          this.noticias = favs;
        });
    }

}
