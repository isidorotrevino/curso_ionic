import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagpackerPage } from './tagpacker.page';

const routes: Routes = [
  {
    path: '',
    component: TagpackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagpackerPageRoutingModule {}
