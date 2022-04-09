import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from 'src/app/pages/settings/settings/settings.page';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

  constructor(
    private authService:AuthService,
    private modalController:ModalController
  ) { }

  modal: HTMLElement

  async settings()
  {
    const modal = await this.modalController.create({
      component: SettingsPage
    })

    return await modal.present()
  }

  getStats()
  {
    alert('stats')
  }

  getNotifications()
  {
    alert('notifications')
  }

  async logout()
  {
    await this.authService.logout()
  }
}
