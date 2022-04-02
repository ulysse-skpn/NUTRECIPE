import { Component } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsIn } from 'src/app/interfaces/credentials/credentials-in';
import { UserOut } from 'src/app/interfaces/user/user-out';
import { RootService } from 'src/app/services/root-service/root.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-root-nutrecipe',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {

  constructor(
    private rootService:RootService,
    private storageService:StorageService,
    private route:Router
  ) { }
  
  hide = true

  emailControl = new FormControl("",[Validators.required, Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ])
  passwordControl = new FormControl("",[Validators.required, Validators.minLength(6) ])
  
  login()
  {
    const credentials:CredentialsIn =
    {
      email:this.emailControl.value,
      password:this.passwordControl.value
    }

    this.rootService.login(credentials).subscribe( async(res:UserOut) => {
      await this.storageService.set( "access_token" , res.access_token )
      await this.storageService.set( "expiresIn" , res.expires_in.toString() )
      return location.href = "/dashboard"
    })
  }


  register():void
  {
    this.route.navigate(["/","register"])
  }


  forgotPassword():void
  {
    this.route.navigate(["/","forgotPassword"])
  }

  getErrorMessage( input:string )
  {
    if( input === 'email' )
    {
      if( this.emailControl.hasError('required') ) return "Un email est requis"
      else if( this.emailControl.hasError('pattern') ) return "L'adresse email n'est pas bien formaté"
      return this.emailControl.hasError('email') ? "L'adress email n'est pas valide" : ""
    } 
    else if( input === 'password' )
    {
      if( this.passwordControl.hasError('required') ) return "Un mot de passe est requis"
      // Beware of the spelling of the word minlength instead of minLength
      return this.passwordControl.hasError('minlength') ? 'Le mot de passe doit avoir au moins 6 caractères' : ""
    }
    else return ""
  }

}