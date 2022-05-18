import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ActionSheetController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { RouteGuard } from 'src/app/services/route-guard/route.guard';
import { UsersService } from 'src/app/services/users/users.service';
import { NotAuthorizedPage } from '../../not-authorized/not-authorized/not-authorized.page';

import { SettingsPage } from './settings.page';


function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

const actionSheetControllerStub = new ActionSheetController() 

fdescribe('SettingsPage', () => {
  let component: SettingsPage
  let fixture: ComponentFixture<SettingsPage>
  let httpMock: HttpTestingController
  let routerMock: RouterTestingModule
  let jwtHelper: JwtHelperService
  let routeGuard: RouteGuard
  let router: Router
  let userService:UsersService
  let toastController:ToastController
  let actionSheetController:ActionSheetController

  let el:HTMLElement
  let jwtHelperStub:any
  let token:any


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

  let userServiceSpy:any

  
  beforeEach(waitForAsync(() => {
    
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      return store[key] = <string>value
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
      getUserById: of(mockUser)
    })

    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: [IonicModule.forRoot() , HttpClientTestingModule , RouterModule , RouterTestingModule.withRoutes([
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    jwtHelper = TestBed.inject(JwtHelperService)
    routeGuard = TestBed.inject(RouteGuard)
    userService = TestBed.inject(UsersService)
    httpMock = TestBed.inject(HttpTestingController)
  }));

  afterEach( () => {
    httpMock.verify()
  })


  it('should create Setting Page', () => {
    expect(component).toBeTruthy()
  });

  it('should call ngOnInit method with token not null or expired', () => {
    fixture.detectChanges()
    spyOn<SettingsPage,any>(component,'ngOnInit')
    sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")
    const token = sessionStorage.getItem("access_token")
    expect(token).not.toEqual(null)

    sessionStorage.setItem("userId","2")
    const id = parseInt(sessionStorage.getItem("userId"))
    expect(id).not.toEqual(null)
    expect(id).toEqual(parseInt(sessionStorage.getItem("userId")))


    userService.getUserById(id).subscribe( async(res) => {
      fixture.whenStable().then( () => {
        fixture.detectChanges()
        expect(res).toEqual(mockUser) 
      })
    })

  });

  it('should call ngOnInit method with token null', () => {
    fixture.detectChanges()
    spyOn<SettingsPage,any>(component,'ngOnInit')
    sessionStorage.setItem("access_token",null)
    const token = sessionStorage.getItem("access_token")
    expect(token).toEqual(null)

    sessionStorage.setItem("userId","2")
    const id = parseInt(sessionStorage.getItem("userId"))
    expect(id).not.toEqual(null)
  });
  
  it('should call ngOnInit method with token expired', () => {
    fixture.detectChanges()
    spyOn<SettingsPage,any>(component,'ngOnInit')
    sessionStorage.setItem("access_token","lorem ipsum")
    sessionStorage.setItem("expiresIn","-1")
    const token = sessionStorage.getItem("access_token")
    const isExpired = jwtHelperStub.isTokenExpired(token)
    expect(token).not.toEqual(null)
    expect(isExpired).toEqual(true)
  });


  it('should call dismissModal method', fakeAsync( () => {
    spyOn<SettingsPage,any>(component,'dismissModal').and.callThrough()
    el = fixture.debugElement.query(By.css(".dismiss")).nativeElement
    el.click()
    tick()
    expect(component.dismissModal).toHaveBeenCalled()
    httpMock.match(`${url}/users/${2}`)
  }));

  it('should call modify method when form is disabled', () => {
    component.isDisabled = true
    spyOn<SettingsPage,any>(component,'modify').and.callThrough()
    el = fixture.debugElement.query(By.css(".modify")).nativeElement
    el.click()

    if( component.isDisabled === true )
    {
      expect(component.isDisabled).toBeTrue()
      expect(component.modifyButton).toEqual("Modifier")
    }

    expect(component.modify).toHaveBeenCalled()
  });

  it('should call modify method when form is not disabled', () => {
    component.isDisabled = false
    spyOn<SettingsPage,any>(component,'modify').and.callThrough()
    el = fixture.debugElement.query(By.css(".modify")).nativeElement
    el.click()

    if( component.isDisabled === false )
    {
      expect(component.isDisabled).toBeFalse()
      expect(component.modifyButton).toEqual("Annuler")
    }

    expect(component.modify).toHaveBeenCalled()
  });

  it('should call handleDelete method and cancel when action sheet appear', fakeAsync( async() => { //?
    spyOn<SettingsPage,any>(component,'handleDelete').and.callThrough()
    el = fixture.debugElement.query(By.css(".delete")).nativeElement
    el.click()
    tick()
    expect(component.handleDelete).toHaveBeenCalled()
    expect(el.textContent).toContain("Effacer")

    tick()
    const options = 
    {
      header: 'Suppression de compte',
      subHeader: 'La suppression du compte est définitive',
      buttons: [{
        cssClass:"action_sheet_delete",
        text: 'Supprimer',
        role: 'destructive',
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log("TEST handler")
        }
      }, {
        cssClass:"action_sheet_cancel",
        text: 'Annuler',
        handler: () => {
          return
        }
      }]
    }

    spyOn(actionSheetControllerStub, "create").and.callThrough()

    tick(3000)
    await actionSheetControllerStub.create(options).then( (e) => {
      expect(actionSheetControllerStub.create).toHaveBeenCalled()
    })
    
  }));

  // it('should call deleteUser method and userId is null', () => { //?
  //   spyOn(component,'deleteUser').and.callThrough()
  //   component.deleteUser()
  //   sessionStorage.setItem("userId","2")
  //   const userId = null
  //   expect(userId).toEqual(null)
  //   expect(component.deleteUser()).toBeUndefined()
  // })

  it('should call errorMessage method', () => {
    spyOnProperty(component,'errorMessage','get').and.callThrough()
    expect(component.errorMessage).toBeTruthy()
  });

  it('should call getFormValue method', () => {
    spyOn<SettingsPage,any>(component,'getFormValue').and.callThrough()
    component.getFormValue()
    expect(component.getFormValue).toHaveBeenCalled()
  });

  it('should call setFormValidity method', () => {
    spyOn<SettingsPage,any>(component,'setFormValidity').and.callThrough()
    component.setFormValidity(true)
    expect(component.setFormValidity).toHaveBeenCalled()
    expect(component.setFormValidity).toHaveBeenCalledWith(true)
  });
});
