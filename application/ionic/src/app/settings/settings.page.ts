import { Component , OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsForm: FormGroup;
  settings:Object;
  isModification:boolean = false;
  isPasswordVisible:boolean = false;
  pushNotifications:boolean = false;
  emailNotifications:boolean = false;
  smsNotifications:boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      identifiant: ['' , [Validators.minLength(1)]],
      phoneNumber: ['' , [Validators.minLength(10) , Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['' , [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['' , [Validators.minLength(6)]]
    })
  }

  toggleModif()
  {
    this.isModification = !this.isModification;
    return this.isModification;
  }

  togglePasswordVisibility()
  {
    this.isPasswordVisible = !this.isPasswordVisible;
    return this.isPasswordVisible;
  }

  togglePushNotifications()
  {
    this.pushNotifications = !this.pushNotifications;
    return this.isPasswordVisible;
  }

  toggleEmailNotifications()
  {
    this.emailNotifications = !this.emailNotifications;
    return this.isPasswordVisible;
  }

  toggleSMSNotifications()
  {
    this.smsNotifications = !this.smsNotifications;
    return this.isPasswordVisible;
  }

  saveModif( phoneNumber:string , email:string , password:string , pushNotifications:boolean , emailNotifications:boolean , smsNotifications:boolean )
  {
    this.settings = 
    {
      "phoneNumber":phoneNumber,
      "email":email,
      "password":password,
      "pushNotifications":pushNotifications,
      "emailNotifications":emailNotifications,
      "smsNotifications":smsNotifications
    }
    return this.settings;
  }

  async alertUser( message:string , header:string )
  {
    const alert = await this.alertCtrl.create({
      cssClass: '',
      header: header,
      subHeader: '',
      message: message,
      buttons: [
        {
          text:"Annuler",
          role:"cancel",
        },
        {
          text:"Confirmer",
          handler: () => {
            this.deleteAccount()
          }
        }
      ]
    });
    await alert.present();
  }

  showAlertDeleteAccount()
  {
    return this.alertUser( "Êtes-vous sûr de vouloir supprimer votre compte ? En confirmant , vous serez déconnecter automatiquement", "Suppression du compte");
  }

  showAlertRebootAccount()
  {
    return this.alertUser( "Voulez vous réinitialiser votre compte ? Toutes vos préférences , favoris et toutes les données liés à votre compte seront remis à zéro", "Réinitialisation du compte");
  }

  rebootAccount()
  {

  }

  deleteAccount()
  {
    
  }
}
