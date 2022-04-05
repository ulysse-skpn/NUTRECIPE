import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersPageComponent } from 'src/app/components/usersPage/users-page/users-page.component';
import { IUserIn } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent {

  constructor(
    public dialogRef:MatDialogRef<UsersPageComponent>,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  roles = 
  [
    { name:"Utilisateur" , value:"user" },
    { name:"Gestionnaire de contenu" , value:"admin" }
  ]

  userFormGroup = new FormGroup({
    lastNameControl : new FormControl( "" , [Validators.required , Validators.minLength(2)]),
    firstNameControl : new FormControl( "" , [Validators.required , Validators.minLength(2)]),
    phoneNumberControl : new FormControl( "" , [Validators.minLength(10) , Validators.maxLength(20) , Validators.pattern('[- +()0-9]+')]),
    emailControl : new FormControl( "" , [Validators.required]),
    passwordControl : new FormControl( "" , [Validators.required]),
    roleControl : new FormControl( "" , [Validators.required]),
  })

  onNoClick()
  {
    this.dialogRef.close()
  }

  save()
  {
    if( !this.userFormGroup.valid ) return

    const form = this.userFormGroup.value

    const user:IUserIn = 
    {
      last_name: form.lastNameControl ,
      first_name: form.firstNameControl ,
      phone_number: form.phoneNumberControl ,
      email: form.emailControl ,
      password: form.passwordControl ,
      role: form.roleControl 
    }

    const snackBarRef = this.snackBar.open( "Annuler action : 'Ajouter utilisateur'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.userService.addUser(user).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Elément ajouté" , "" , { duration: 3000 } )
        snackBarRef_.afterDismissed().subscribe(() => {
          this.dialogRef.close()

          let currentUrl = this.route.url;
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate([currentUrl]);
        })
      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.userFormGroup.controls[controlName].hasError(errorName)
  }
}
