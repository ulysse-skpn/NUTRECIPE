import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { IUserIn } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  newPassword:string = ""
  modifyButton:string = 'Modifier'
  isDisabled:boolean = true
  isModify:boolean = false
  receiveEmail:boolean
  receiveNotification:boolean

  settingFormGroup:FormGroup = new FormGroup({
    lastNameControl : new FormControl(),
    firstNameControl : new FormControl(),
    phoneNumberControl : new FormControl(),
    emailControl : new FormControl(),
    passwordControl : new FormControl(),
    receiveEmailControl: new FormControl(),
    receiveNotificationControl: new FormControl()
  })

  constructor(
    private modalController:ModalController,
    private actionSheetController:ActionSheetController,
    private toastController:ToastController,
    private userService:UsersService,
    private authService:AuthService
  ) { }


  ngOnInit(): void 
  {
    let id:number
    
    try 
    {
      if( !sessionStorage.getItem("id") ) return

      id = parseInt(sessionStorage.getItem("id"))

      this.userService.getUserById(id).subscribe( async(res) => {
        
        this.settingFormGroup = new FormGroup({
          lastNameControl:  new FormControl( res.last_name , [ Validators.minLength(1) ]),
          firstNameControl:  new FormControl( res.first_name , [ Validators.minLength(1) ]),
          phoneNumberControl:  new FormControl( res.phone_number , [ Validators.minLength(10) , Validators.maxLength(20) , Validators.pattern('^[0-9]+$')  ]),
          emailControl:  new FormControl( res.email , [ Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
          passwordControl : new FormControl( res.password ,[Validators.required, Validators.minLength(6) ]),
          receiveEmailControl: new FormControl( !res.receiveEmail ),
          receiveNotificationControl: new FormControl( res.receiveNotification )
        })
      })
    } 
    catch (error) 
    {
      return
    }

  }

  async dismissModal()
  {
    if( !this.settingFormGroup.valid || !sessionStorage.getItem('id') ) return

    const form = this.settingFormGroup.value
    const id = parseInt( sessionStorage.getItem('id') )
    
    const user:IUserIn = 
    {
      last_name: form.lastNameControl,
      first_name: form.firstNameControl,
      phone_number: form.phoneNumberControl,
      email: form.emailControl,
      password: form.passwordControl,
      role: 'user',
      receiveEmail:form.receiveEmailControl,
      receiveNotification:form.receiveNotificationControl
    }
    
    this.userService.updateUser( user , id).subscribe( async() => {
      await this.modalController.dismiss()
    })
  
  }

  modify()
  {
    this.isDisabled = !this.isDisabled
    if( this.isDisabled )
    {
      this.modifyButton = "Modifier"
    }
    else
    {
      this.modifyButton = "Annuler"
    }
  }

  async handleDelete()
  {
    const actionSheet = await this.actionSheetController.create({
      header: 'Suppression de compte',
      subHeader: 'La suppression du compte est définitive',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.deleteUser()
        }
      }, {
        text: 'Annuler',
        handler: () => {
          return
        }
      }]
    })

    await actionSheet.present()
  }

  deleteUser()
  {
    if( !sessionStorage.getItem("id") ) return

    const id = parseInt( sessionStorage.getItem("id") )

    this.userService.deleteUser(id).subscribe( async() => {
      const toast = await this.toastController.create({
        message: 'Vous allez être redirigé vers la page de connexion dans quelques instants ...',
        duration: 3000,
      })

      await toast.present().then( async() => {
        await this.modalController.dismiss()
      })

      await toast.onDidDismiss().then( async() => {
        await this.authService.logout()
      })
    })
  }

  get errorMessage() {
    return this.settingFormGroup.controls;
  }
}
