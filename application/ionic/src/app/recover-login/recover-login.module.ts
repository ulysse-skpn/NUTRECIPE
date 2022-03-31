import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecoverLoginPageRoutingModule } from './recover-login-routing.module';

import { RecoverLoginPage } from './recover-login.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecoverLoginPageRoutingModule
  ],
  declarations: [RecoverLoginPage]
})
export class RecoverLoginPageModule {}
