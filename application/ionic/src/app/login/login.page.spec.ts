import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';




describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let authService: AuthService;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule ],
      providers: 
      [
        { provide: AuthService , useValue: authServiceSpy },
        { provide: FormBuilder }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create Login page', () => {
    expect(component).toBeTruthy();
  });


  it('should call submitForm method', () => {
    fixture.detectChanges();
    spyOn(component,'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitForm).toHaveBeenCalledTimes(1);
  });


  it('should call alertUser method', async() => {
    let message = "AlertUser";
    let header = "Header title";
    fixture.detectChanges();
    spyOn(component,'alertUser');

    fixture.whenStable().then(() => {
      component.alertUser(message, header);
      expect(component.alertUser).toHaveBeenCalledTimes(1);
    })
  });


  it('should call signUp method', () => {
    spyOn(component,'signUp');
    component.signUp();
    expect(component.signUp).toHaveBeenCalledTimes(1);
  });


  it('should call recoverLogin method', async() => {
    fixture.detectChanges();
    spyOn(component,'recoverLogin');

    fixture.whenStable().then(() => {
      component.recoverLogin();
      expect(component.recoverLogin).toHaveBeenCalledTimes(1);
    })
  });

  it('should call fetchStatus method', () => {
    fixture.detectChanges();
    spyOn(component,'fetchStatus');
    component.fetchStatus();
    expect(component.fetchStatus).toHaveBeenCalledTimes(1);
  });

  
  it('should render input elements', () => {
    const _elements_ = fixture.debugElement.nativeElement;
    const emailInput = _elements_.querySelector('input[name="email"]');
    const passwordInput = _elements_.querySelector('input[name="password"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });


  it('form should be invalid when email and password inputs are empty', () => {
    component.ngOnInit();
    component.ionicForm.controls['email'].setValue('');
    component.ionicForm.controls['password'].setValue('');
    expect(component.ionicForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.ngOnInit();
    component.ionicForm.controls['email'].setValue('test@hotmail.fr');
    component.ionicForm.controls['password'].setValue('azerty');
    expect(component.ionicForm.valid).toBeTruthy();
  });


  it('email is not null but invalid', () => {
    component.ngOnInit();
    const email = component.ionicForm.controls['email'];
    email.setValue("a");
    expect(email.valid).toBe(false);
  });


  it('email is not null and valid', () => {
    component.ngOnInit();
    const email = component.ionicForm.controls['email'];
    email.setValue("a@gmail.com");
    expect(email.valid).toBe(true);
  });


  it('password with less than 6 characters is invalid', () => {
    component.ngOnInit();
    const password = component.ionicForm.controls['password'];
    password.setValue("abc");
    expect(password.value.length).toBeLessThan(6);
  });

  it('user should not be logged at startup', () => {
    expect(component.isLogged).toBeFalse();
  });

  it('user should not be submitted at startup', () => {
    expect(component.isSubmitted).toBeFalse();
  });

  

  // it('The form should be submitted', () => {
  //   const ionicForm = loginPageSpy.ionicForm;
  //   expect( ionicForm.valid ).toBeTruthy();
  //   loginPageSpy.submitForm()
  //   // if( ionicForm.valid )
  //   // {
  //   //   expect(loginPageSpy.submitForm).toHaveBeenCalled();
  //   // }
  // });

  // it('The form should not be submitted', () => {
  //   const ionicForm = component.ionicForm;
  //   component.submitForm()
  //   if( !ionicForm.valid )
  //   {
  //     expect(component.submitForm).toBe(false);
  //   }
  // });

});

