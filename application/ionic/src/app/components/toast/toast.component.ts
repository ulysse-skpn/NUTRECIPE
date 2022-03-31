import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(
    private  toastCtrl:ToastController
  ) { }

  ngOnInit() {}

  async showToast( message )
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration:2000,
    });
    toast.present();
  }

}
