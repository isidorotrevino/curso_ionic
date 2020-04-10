import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {PipesModule} from '../pipes/pipes.module';
import {DetalleComponent} from '../components/detalle/detalle.component';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    entryComponents: [
        DetalleComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        PipesModule,
        ComponentsModule
    ],
    declarations: [Tab2Page]
})
export class Tab2PageModule {
}
