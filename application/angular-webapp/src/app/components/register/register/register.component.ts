import { Component, OnInit } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserIn } from 'src/app/interfaces/user/user-in';
import { RootService } from 'src/app/services/root-service/root.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private route:Router,
    private rootService:RootService,
    private storageService:StorageService
  ) { }

  hide:boolean = true

  
  lastNameControl:FormControl =  new FormControl( "" , [ Validators.required , Validators.minLength(1) ])
  firstNameControl:FormControl =  new FormControl( "" , [ Validators.required , Validators.minLength(1) ])
  phoneNumberControl:FormControl =  new FormControl( null , [ Validators.minLength(10) , Validators.maxLength(20)  ])
  emailControl:FormControl =  new FormControl( "" , [ Validators.required , Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ])
  passwordControl:FormControl =  new FormControl( "" , [ Validators.required , Validators.minLength(6) ])
  

  returnToLogin():void
  {
    this.route.navigate(["/"])
  }

  onFormSubmit()
  {
    const phone_number = this.phoneNumberControl.value.length === 0 ? null : this.phoneNumberControl.value
    const userIn:UserIn =
    {
      last_name : this.lastNameControl.value,
      first_name : this.firstNameControl.value,
      phone_number : phone_number,
      email : this.emailControl.value,
      password : this.passwordControl.value,
      role: "admin"
    }

    this.rootService.register(userIn).subscribe( async(res) => {
      await this.storageService.set( "access_token" , res.access_token )
      await this.storageService.set( "expiresIn" , res.expires_in.toString() )
      return location.href = "/dashboard"
    })
  }

  getErrorMessage( input:string )
  {
    // Beware of the spelling of the word minlength instead of minLength
    if( input === 'last_name' )
    {
      if( this.lastNameControl.hasError('required') ) return "Un nom de famille est requis"
      return this.lastNameControl.hasError('minlength') ? "Un nom doit avoir au moins une lettre" : ""
    } 
    else if( input === 'first_name' )
    {
      if( this.firstNameControl.hasError('required') ) return "Un prénom est requis"
      return this.firstNameControl.hasError('minlength') ? "Un prénom doit avoir au moins une lettre" : ""
    } 
    else if( input === 'phone_number' )
    {
      if( this.phoneNumberControl.hasError('minlength') ) return "10 caractères minimum"
      return this.phoneNumberControl.hasError('maxlength') ? "20 caratères maximum" : ""
    } 
    else if( input === 'email' )
    {
      if( this.emailControl.hasError('required') ) return "Un email est requis"
      else if( this.emailControl.hasError('pattern') ) return "L'adresse email n'est pas bien formaté"
      return this.emailControl.hasError('email') ? "L'adress email n'est pas valide" : ""
    } 
    else if( input === 'password' )
    {
      if( this.passwordControl.hasError('required') ) return "Un mot de passe est requis"
      return this.passwordControl.hasError('minlength') ? 'Le mot de passe doit avoir au moins 6 caractères' : ""
    }
    else return ""
  }
}
