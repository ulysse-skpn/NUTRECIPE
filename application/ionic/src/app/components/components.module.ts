
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from '../app-routing.module';
import { DrawerComponent } from './drawer/drawer.component';
import { ToastComponent } from './toast/toast.component';

const COMPONENTS = [
    DrawerComponent,ToastComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CommonModule,
        IonicModule,
        AppRoutingModule
    ],
    exports: COMPONENTS
})
export class ComponentsModule { }