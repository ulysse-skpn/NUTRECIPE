import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICredentialsIn } from 'src/app/interfaces/ICredentials';
import { IUserOut } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }


  loginFormGroup = new FormGroup({
    emailControl : new FormControl("",[Validators.required, Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
    passwordControl : new FormControl("",[Validators.required, Validators.minLength(6) ])
  })


  goToRegister()
  {
    this.router.navigate(['/register'])
  }

  goToForgotPassword()
  {
    this.router.navigate(['/forgot-password'])
  }

  onFormSubmit()
  { 
    if( !this.loginFormGroup.valid ) return
    const form = this.loginFormGroup.value

    const credentials:ICredentialsIn = 
    {
      email:form.emailControl,
      password:form.passwordControl
    } 

    this.authService.login(credentials).subscribe( async(res:IUserOut) => {

      if( res.user.role !== "user" ) 
      {
        window.alert("Vous n'avez pas les droits pour vous connecter à l'application")
        return
      }
      sessionStorage.setItem( "access_token" , res.access_token )
      sessionStorage.setItem( "expiresIn" , res.expires_in.toString() )
      
      this.authService.redirectTo("tabs")
    })
    
  }

  get errorMessage() {
    return this.loginFormGroup.controls;
  }
}
