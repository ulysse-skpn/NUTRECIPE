import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ActionSheetController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { IUser, IUserIn } from 'src/app/interfaces/IUser';
import { RouteGuard } from 'src/app/services/route-guard/route.guard';
import { UsersService } from 'src/app/services/users/users.service';
import { NotAuthorizedPage } from '../../not-authorized/not-authorized/not-authorized.page';

import { SettingsPage } from './settings.page';

function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

const actionSheetControllerStub = new ActionSheetController() 

describe('SettingsPage', () => {
  let component: SettingsPage
  let fixture: ComponentFixture<SettingsPage>
  let userService:UsersService

  let el:HTMLElement
  let jwtHelperStub:any


  let url = 'http://localhost:3000'
  let store = {}

  const mockUser: IUser = 
  {
    userId: 0,
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
    role: '',
    receiveEmail: false,
    receiveNotification: false,
    created_at: '',
    updated_at: ''
  }

  const mockUserIn:IUserIn = 
  {
    last_name: '',
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
    role: '',
    receiveEmail: false,
    receiveNotification: false
  }

  let userServiceSpy:any

  
  beforeEach(waitForAsync(() => {
    
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value
      return store
    })
  
    spyOn(sessionStorage,'getItem').and.callFake( (key) => {
      return store[key] || null
    })

    jwtHelperStub = 
    {
      isTokenExpired: jasmine.createSpy('isTokenExpired').and.returnValue(true)
    }

    userServiceSpy = jasmine.createSpyObj<UsersService>('UserService',
    {
      getUserById: of(mockUser),
      deleteUser: of([1]),
    })

    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: [IonicModule.forRoot() , HttpClientTestingModule , RouterModule , ReactiveFormsModule , RouterTestingModule.withRoutes([
        {
          path:'settings' , component: SettingsPage
        },
        {
          path:'notauthorized' , component: NotAuthorizedPage
        }
      ]) , JwtModule.forRoot({
        config:
        {
          tokenGetter: tokenGetter,
          allowedDomains:
          [
            'https://127.0.0.1:3000',
            'https://localhost:4000',
            'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
          ]
        }
      }) ],
      providers: 
      [ RouteGuard , 
        {
          provide: UsersService , useValue: userServiceSpy
        },
        {
          provide: ModalController 
        },
        {
          provide: ToastController 
        },
        {
          provide: ActionSheetController , useValue: actionSheetControllerStub
        },
        {
          provide:JwtHelperService
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;

    userService = TestBed.inject(UsersService)

    fixture.detectChanges()
  }));


  it('should create Setting Page', () => {
    expect(component).toBeTruthy()
  });

  // it('should call ngOnInit method with token not null or expired', () => {
  //   spyOn<SettingsPage,any>(component,'ngOnInit').and.callThrough()

  //   sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")
  //   const token = sessionStorage.getItem("access_token")
  //   expect(token).not.toEqual(null)

  //   sessionStorage.setItem("userId","2")
  //   const id = parseInt(sessionStorage.getItem("userId"))
  //   expect(id).not.toEqual(null)
  //   expect(id).toEqual(parseInt(sessionStorage.getItem("userId")))

  //   component.ngOnInit()

  //   userService.getUserById(id).subscribe( async(res) => {
  //     fixture.whenStable().then( () => {
  //       fixture.detectChanges()
  //       expect(res).toEqual(mockUser) 
  //     })
  //   })

  // });

  // it('should call ngOnInit method with token null', () => {
  //   spyOn<SettingsPage,any>(component,'ngOnInit').and.callThrough()

  //   component.ngOnInit()

  //   sessionStorage.setItem("access_token",null)
  //   const token = sessionStorage.getItem("access_token")
  //   expect(token).toEqual(null)

  //   sessionStorage.setItem("userId","2")
  //   const id = parseInt(sessionStorage.getItem("userId"))
  //   expect(id).not.toEqual(null)
  // });
  
  // it('should call ngOnInit method with token expired', () => {
  //   spyOn<SettingsPage,any>(component,'ngOnInit').and.callThrough()

  //   component.ngOnInit()

  //   sessionStorage.setItem("access_token","lorem ipsum")
  //   sessionStorage.setItem("expiresIn","-1")
  //   const token = sessionStorage.getItem("access_token")
  //   const isExpired = jwtHelperStub.isTokenExpired(token)
  //   expect(token).not.toEqual(null)
  //   expect(isExpired).toEqual(true)
  // });


  // it('should call dismissModal method', async() => {
  //   const spy = spyOn<SettingsPage,any>(component,'dismissModal').and.callThrough()

  //   component.dismissModal()
    
  //   sessionStorage.setItem("userId","2")
  //   const id = parseInt(sessionStorage.getItem("userId"))
  //   expect(id).not.toEqual(null)


  //   fixture.whenStable().then( () => {
  //     const serviceSpy = spyOn(userService,'updateUser').and.returnValue(of([1]))
  //     userService.updateUser(mockUserIn,1)

  //     expect(spy).toHaveBeenCalled()
  //     expect(serviceSpy).toHaveBeenCalled()
  //     httpMock.match(`${url}/users/${2}`)
  //   })
  // });

  // it('dismissModal method should return when userId in sessionStorage is null', async() => {
  //   spyOn<SettingsPage,any>(component,'dismissModal').and.callThrough()

  //   component.dismissModal()
    
  //   fixture.whenStable().then( () => {
  //     fixture.detectChanges()

  //     sessionStorage.setItem("userId",null)
  //     const id = sessionStorage.getItem("userId")
  //     expect(id).toEqual(null)
  //   })
  // });


  // it('should call modify method when form is disabled', () => {
  //   const spy = spyOn<SettingsPage,any>(component,'modify').and.callThrough()
  //   component.isDisabled = true

  //   component.modify()

  //   if( component.isDisabled === true )
  //   {
  //     expect(component.isDisabled).toBeTrue()
  //     expect(component.modifyButton).toEqual("Modifier")
  //   }

  //   expect(spy).toHaveBeenCalled()
  // });

  // it('should call modify method when form is not disabled', () => {
  //   const spy = spyOn<SettingsPage,any>(component,'modify').and.callThrough()
  //   component.isDisabled = false

  //   component.modify()

  //   if( component.isDisabled === false )
  //   {
  //     expect(component.isDisabled).toBeFalse()
  //     expect(component.modifyButton).toEqual("Annuler")
  //   }

  //   expect(spy).toHaveBeenCalled()
  // });

  // it('should call handleDelete method and cancel when action sheet appear', async() => {
  //   const spy = spyOn<SettingsPage,any>(component,'handleDelete').and.callThrough()
  //   el = fixture.debugElement.query(By.css(".delete")).nativeElement
  //   el.click()
    
  //   fixture.whenStable().then( () => {

  //     fixture.detectChanges()
  //     expect(spy).toHaveBeenCalled()
  //     expect(el.textContent).toContain("Effacer")
  //   })

  //   const options = 
  //   {
  //     header: 'Suppression de compte',
  //     subHeader: 'La suppression du compte est définitive',
  //     buttons: [{
  //       cssClass:"action_sheet_delete",
  //       text: 'Supprimer',
  //       role: 'destructive',
  //       data: {
  //         type: 'delete'
  //       },
  //       handler: () => {
  //         console.log("TEST handler")
  //       }
  //     }, {
  //       cssClass:"action_sheet_cancel",
  //       text: 'Annuler',
  //       handler: () => {
  //         return
  //       }
  //     }]
  //   }

  // const spy2 =  spyOn(actionSheetControllerStub, "create").and.callThrough()

  //   fixture.whenStable().then( () => {
  //     fixture.detectChanges

  //     actionSheetControllerStub.create(options).then( (e) => {
  //       expect(spy2).toHaveBeenCalled()
  //     })
  //   })
    
  // });

  it('should call delete method', () => {
    const spy = spyOn(component,'deleteUser').and.callThrough()
    component.deleteUser()
    expect(spy).toHaveBeenCalled()
  });

  it('should call getFormValue method', () => {
    const spy = spyOn<SettingsPage,any>(component,'getFormValue').and.callThrough()
    component.getFormValue()
    expect(spy).toHaveBeenCalled()
  });

});
