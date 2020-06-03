import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagpackerPageRoutingModule } from './tagpacker-routing.module';

import { TagpackerPage } from './tagpacker.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TagpackerPageRoutingModule,
        ComponentsModule
    ],
  declarations: [TagpackerPage]
})
export class TagpackerPageModule {}
