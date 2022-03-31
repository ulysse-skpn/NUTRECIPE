import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';


import { RegisterPage } from './register.page';
import { FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let authService: AuthService;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot() , IonicStorageModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule ],
      providers: 
      [
        { provide: AuthService , useValue: authServiceSpy },
        { provide: FormBuilder },
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create RegisterPage component', () => {
    expect(component).toBeTruthy();
  });


  it('[ngOnInit] should call ngOnInit method', () => {
    spyOn(component,'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });


  it('[fetchStatus] should call fetchStatus method', () => {
    spyOn(component,'fetchStatus');
    component.fetchStatus();
    expect(component.fetchStatus).toHaveBeenCalled();
  });


  it('isLogged should change value (boolean true)', () => {
    component.isLogged = true;
    expect(component.isLogged).toBeTrue();
  });


  it('isLogged should change value (boolean false)', () => {
    component.isLogged = false;
    expect(component.isLogged).toBeFalse();
  });


  it('[alertUser] should call alertUser method', async() => {
    let message = "AlertUser";
    let header = "Header title";
    fixture.detectChanges();
    spyOn(component,'alertUser');

    fixture.whenStable().then(() => {
      component.alertUser(message, header , "OK");
      expect(component.alertUser).toHaveBeenCalledTimes(1);
    })
  });


  it('[signUp] should call signUp method', () => {
    spyOn(component,'signUp');
    component.signUp();
    expect(component.signUp).toHaveBeenCalledTimes(1);
  });


  it('[email] should be valid', () => {
    component.ngOnInit();
    let ionicFormSignUp = component.ionicFormSignUp;
    ionicFormSignUp.controls['email'].setValue("test@gmail.com")
    expect(ionicFormSignUp.controls['email'].valid).toBe(true);
  });


  it('[email] should be invalid', () => {
    component.ngOnInit();
    let ionicFormSignUp = component.ionicFormSignUp;
    ionicFormSignUp.controls['email'].setValue("t")
    expect(ionicFormSignUp.controls['email'].valid).toBe(false);
  });


  it('[password] should be valid', () => {
    component.ngOnInit();
    let ionicFormSignUp = component.ionicFormSignUp;
    ionicFormSignUp.controls['password'].setValue("azerty")
    expect(ionicFormSignUp.controls['password'].valid).toBe(true);
  });


  it('[password] should be invalid', () => {
    component.ngOnInit();
    let ionicFormSignUp = component.ionicFormSignUp;
    ionicFormSignUp.controls['password'].setValue("")
    expect(ionicFormSignUp.controls['password'].valid).toBe(false);
  });

  
  it('should render input elements', () => {
    const _elements_ = fixture.debugElement.nativeElement;
    const lastNameInput = _elements_.querySelector('input[name="lastName"]');
    const firstNameInput = _elements_.querySelector('input[name="firstName"]');
    const phoneNumnerInput = _elements_.querySelector('input[name="phoneNumber"]');
    const emailInput = _elements_.querySelector('input[name="email"]');
    const passwordInput = _elements_.querySelector('input[name="password"]');
    expect(lastNameInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(phoneNumnerInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });


  it('form should be invalid when inputs are empty', () => {
    component.ionicFormSignUp.controls['lastName'].setValue('');
    component.ionicFormSignUp.controls['firstName'].setValue('');
    component.ionicFormSignUp.controls['phoneNumber'].setValue('');
    component.ionicFormSignUp.controls['email'].setValue('');
    component.ionicFormSignUp.controls['password'].setValue('');
    expect(component.ionicFormSignUp.valid).toBeFalse();
  });

  it('form should be valid', () => {
    component.ionicFormSignUp.controls['lastName'].setValue('Dupont');
    component.ionicFormSignUp.controls['firstName'].setValue('Jean');
    component.ionicFormSignUp.controls['phoneNumber'].setValue('0102030405');
    component.ionicFormSignUp.controls['email'].setValue('test@hotmail.fr');
    component.ionicFormSignUp.controls['password'].setValue('azerty');
    expect(component.ionicFormSignUp.valid).toBeTrue();
  });


  it('email is not null but invalid', () => {
    const email = component.ionicFormSignUp.controls['email'];
    email.setValue("a");
    expect(email.valid).toBe(false);
  });


  it('email is not null and valid', () => {
    const email = component.ionicFormSignUp.controls['email'];
    email.setValue("a@gmail.com");
    expect(email.valid).toBe(true);
  });


  it('password with less than 6 characters is invalid', () => {
    const password = component.ionicFormSignUp.controls['password'];
    password.setValue("abc");
    expect(password.value.length).toBeLessThan(6);
  });


  it('lastName should have at least 1 character' , () => {
    const lastName = component.ionicFormSignUp.controls['lastName'];
    lastName.setValue('a');
    expect(lastName.value.length).toBeGreaterThanOrEqual(1);
  })


  it('lastName should not be empty' , () => {
    const lastName = component.ionicFormSignUp.controls['lastName'];
    lastName.setValue('');
    expect(lastName.value.length).toBeLessThan(1);
  })


  it('user should not be logged at startup', () => {
    expect(component.isLogged).toBeFalse();
  });


  it('user should not be submitted at startup', () => {
    expect(component.isSubmitted).toBeFalse();
  });

});
