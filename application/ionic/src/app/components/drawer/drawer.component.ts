import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

const AppName = "App Recette";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() 
  {
    this.getName();
  }

  openDrawer() {
    this.menuCtrl.open('end');
  }

  closeDrawer() {
    this.menuCtrl.close();
  }

  getName()
  {
    return AppName;
  }

  statistics()
  {
    alert('stats');
  }

  notifications()
  {
    alert('notification');
  }

  settings()
  {
    location.href = "settings";
  }

  async signOut()
  {
    await this.authService.logout();
  }
}
