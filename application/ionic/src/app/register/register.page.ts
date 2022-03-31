import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController , AlertController } from '@ionic/angular';
import { RegisterIn } from '../interfaces/user/register_in';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicFormSignUp: FormGroup;
  isSubmitted = false;
  isLogged = false;
  registerIn: RegisterIn;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private storageService: Storage
  ) { }

  ngOnInit() 
  {
    this.ionicFormSignUp = this.formBuilder.group({
      lastName: ['' , [Validators.required , Validators.minLength(1)]],
      firstName: ['' , [Validators.required , Validators.minLength(1)]],
      phoneNumber: ['' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['' , [Validators.required, Validators.minLength(5)]]
    })
  }

  fetchStatus()
  {
    this.authService.isLoggedIn().subscribe({
      next: result => {
        this.isLogged = result;
        if( this.isLogged == true )
        {
          this.alertUser( "Inscription réalisée avec succès" , "Inscription" , "");
          setTimeout(() => {
            location.href = "/tabs";
          }, 2000);
        }
      }
    })
  }

  async alertUser( message , header , btn )
  {
    const alert = await this.alertCtrl.create({
      cssClass: '',
      header: header,
      subHeader: '',
      message: message,
      buttons: [btn]
    });
    await alert.present();
  }

  backToLogin()
  {
    location.href = "/login";
  }

  signUp()
  { 
    if(!this.ionicFormSignUp.valid)
    {
      this.alertUser("Le formulaire n'est pas correctement rempli , veuillez recommencer" , "Erreur" , "Fermer");
      return false;
    }
    else
    {
      const lastName = this.ionicFormSignUp.value.lastName;
      const firstName = this.ionicFormSignUp.value.firstName;
      const phoneNumber = this.ionicFormSignUp.value.phoneNumber;
      const email = this.ionicFormSignUp.value.email;
      const password = this.ionicFormSignUp.value.password;
      this.registerIn = {
        "last_name":lastName,
        "first_name":firstName,
        "phone_number":phoneNumber,
        "email":email,
        "password":password,
        "status":0
      };
      const result = this.authService.register(this.registerIn).subscribe( res => {
        const ACCESS_TOKEN = res.access_token;
        const EXPIRES_IN = res.expires_in;
        this.storageService.set("ACCESS_TOKEN",ACCESS_TOKEN);
        this.storageService.set("EXPIRES_IN",EXPIRES_IN);
      });
      this.fetchStatus();
    }
  }
}
