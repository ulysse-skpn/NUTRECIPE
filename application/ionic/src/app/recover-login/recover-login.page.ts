import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recover-login',
  templateUrl: './recover-login.page.html',
  styleUrls: ['./recover-login.page.scss'],
})
export class RecoverLoginPage implements OnInit {

  ionicFormRecover: FormGroup;

  constructor(
    private modalCtrl:ModalController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() 
  {
    this.ionicFormRecover = this.formBuilder.group({
      emailRecover: ['' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    })
  }

  async sendEmail( email: string )
  {
    return email;
  }

  async dismissModal()
  {
    await this.modalCtrl.dismiss();
  }

  recoverLogin()
  { 
    if(!this.ionicFormRecover.valid)
    {
      return false;
    }
    else
    {
      const userEmail = this.ionicFormRecover.value.email;
      this.sendEmail( userEmail );
      return true;
    }
  }
}
