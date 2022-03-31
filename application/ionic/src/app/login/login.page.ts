import { Component, OnInit } from '@angular/core';
import { ModalController , AlertController } from '@ionic/angular';
import { RecoverLoginPage } from '../recover-login/recover-login.page';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserIn } from '../interfaces/user/user-in';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  isLogged = false;
  user: UserIn;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() 
  {
    this.ionicForm = this.formBuilder.group({
      email: ['' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['' , [Validators.required, Validators.minLength(6)]]
    })
  }

  fetchStatus()
  {
    this.authService.isLoggedIn().subscribe({
      next: result => {
        this.isLogged = result;
        if( this.isLogged == true )
        {
          this.alertUser( "Connexion réussie" , "Connexion");
          setTimeout(() => {
            location.href = "/tabs";
          }, 2000);
        }
      }
    })
  }

  async recoverLogin()
  {
    const modal =  await this.modalCtrl.create({
      component: RecoverLoginPage
    })
    await modal.present();
  }

  signUp()
  {
    location.href = "/register";
  }

  async alertUser( message , header )
  {
    const alert = await this.alertCtrl.create({
      cssClass: '',
      header: header,
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  submitForm() 
  {
    this.isSubmitted = true;
    if(!this.ionicForm.valid)
    {
      this.alertUser("Le formulaire n'est pas correctement rempli , veuillez recommencer" , "Erreur");
      return false;
    }
    else
    {
      const userEmail = this.ionicForm.value.email;
      const userPassword = this.ionicForm.value.password;
      this.user = {
        "email":userEmail,
        "password":userPassword
      };
      this.authService.login(this.user).subscribe();
      this.fetchStatus();
    }
  }

}
