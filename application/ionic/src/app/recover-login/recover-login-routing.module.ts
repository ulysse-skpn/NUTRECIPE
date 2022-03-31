import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverLoginPage } from './recover-login.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverLoginPageRoutingModule {}
