import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersPageComponent } from 'src/app/components/usersPage/users-page/users-page.component';
import { IUser, IUserOutModif } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-dialog-modif-user',
  templateUrl: './dialog-modif-user.component.html',
  styleUrls: ['./dialog-modif-user.component.css']
})
export class DialogModifUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<UsersPageComponent>,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  id!:number
  selectedUser!: IUser

  roles = 
  [
    { name:"Utilisateur" , value:"user" },
    { name:"Gestionnaire de contenu" , value:"admin" }
  ]
  
  userFormGroup = new FormGroup({
    lastNameControl : new FormControl(),
    firstNameControl : new FormControl(),
    phoneNumberControl : new FormControl(),
    emailControl : new FormControl(),
    passwordControl : new FormControl(),
    roleControl : new FormControl(),
  })

  ngOnInit(): void 
  {
    this.userService.getUserById(this.data.id).subscribe( (res:IUser) => {

      this.selectedUser = res
      this.id = res.id

      this.userFormGroup = new FormGroup({
        lastNameControl : new FormControl( res.last_name , [Validators.required , Validators.minLength(2)]),
        firstNameControl : new FormControl( res.first_name , [Validators.required , Validators.minLength(2)]),
        phoneNumberControl : new FormControl( res.phone_number , [Validators.minLength(10) , Validators.maxLength(20) , Validators.pattern('[- +()0-9]+')]),
        emailControl : new FormControl( res.email , [Validators.required]),
        passwordControl : new FormControl( res.password , [Validators.required]),
        roleControl : new FormControl( res.role , [Validators.required]),
      })
    })
  }

  onNoClick()
  {
    this.dialogRef.close()
  }

  save()
  {
    if( !this.userFormGroup.valid ) return

    const form = this.userFormGroup.value

    const user:IUserOutModif = 
    {
      id:this.id,
      last_name: form.lastNameControl ,
      first_name: form.firstNameControl ,
      phone_number: form.phoneNumberControl ,
      email: form.emailControl ,
      password: form.passwordControl ,
      role: form.roleControl 
    }
        
    
    const snackBarRef = this.snackBar.open( "Annuler action : 'Modifier utilisateur'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.userService.updateUser(user,this.id).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Elément modifié" , "" , { duration: 3000 } )
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
