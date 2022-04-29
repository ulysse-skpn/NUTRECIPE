import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SideMenuComponent } from '../components/side-menu/side-menu/side-menu.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { JwtModule } from "@auth0/angular-jwt";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../helpers/authconfig.interceptor';

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    Tab3PageRoutingModule,
    JwtModule.forRoot({
      config:
      {
        tokenGetter: tokenGetter,
        allowedDomains:
        [
          'https://127.0.0.1:3000',
          'https://localhost:4000',
          'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
        ]
      }
    })
  ],
  declarations: [Tab3Page,SideMenuComponent],
  providers: 
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class Tab3PageModule {}
