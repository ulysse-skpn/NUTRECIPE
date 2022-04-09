import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(
    private modalController:ModalController
  ) { }

  async dismissModal()
  {
    await this.modalController.dismiss()
  }
}
