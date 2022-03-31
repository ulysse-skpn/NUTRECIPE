import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecoverLoginPage } from './recover-login.page';
import { FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RecoverLoginPage', () => {
  let component: RecoverLoginPage;
  let fixture: ComponentFixture<RecoverLoginPage>;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverLoginPage ],
      imports: [IonicModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule ],
      providers: 
      [
        { provide: AuthService , useValue: authServiceSpy },
        { provide: FormBuilder }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create RecoverLogin Page', () => {
    expect(component).toBeTruthy();
  });


  it('[ngOnInit] should call ngOnInit method', () => {
    spyOn(component,'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });


  it('[dismissModal] should call dismissModal method', async() => {
    spyOn(component,'dismissModal');
    fixture.whenStable().then(() => {
      component.dismissModal();
      expect(component.dismissModal).toHaveBeenCalled();
    })
  });


  it('[sendEmail] should call sendEmail method', async() => {
    spyOn(component,'sendEmail');
    fixture.whenStable().then(() => {
      component.sendEmail( "test@gmail.com" );
      expect(component.sendEmail).toHaveBeenCalled();
    })
  });


  // it('[recoverLogin] should return false', async() => {
  //   const email = "test@gmail.com";
  //   spyOn(component,'sendEmail').and.resolveTo(email);
  //   fixture.whenStable().then(() => {
  //     const result = component.sendEmail( "test@gmail.com" ).then( res => {
  //       expect(res).toEqual(email);
  //     });
  //   })
  // });


  it('[recoverLogin] should call recoverLogin method', () => {
    spyOn(component,'recoverLogin');
    component.recoverLogin();
    expect(component.recoverLogin).toHaveBeenCalled();
  });


  it('[email] should be required', () => {
    component.ngOnInit();
    let errors = {};
    let email = component.ionicFormRecover.controls['emailRecover'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });


  it('[recoverLogin] should return false', () => {
    component.ngOnInit();
    spyOn(component,'recoverLogin').and.returnValue(false);
    const result = component.recoverLogin();
    expect(result).toBeFalse();
  });


  it('[recoverLogin] should return true', () => {
    component.ngOnInit();
    spyOn(component,'recoverLogin').and.returnValue(true);
    const result = component.recoverLogin();
    expect(result).toBeTrue();
  });


  it('[email] should be valid', () => {
    component.ngOnInit();
    let ionicFormRecover = component.ionicFormRecover;
    ionicFormRecover.controls['emailRecover'].setValue("test@gmail.com")
    expect(ionicFormRecover.controls['emailRecover'].valid).toBe(true);
  });


  it('[email] should be invalid', () => {
    component.ngOnInit();
    let ionicFormRecover = component.ionicFormRecover;
    ionicFormRecover.controls['emailRecover'].setValue("t")
    expect(ionicFormRecover.controls['emailRecover'].valid).toBe(false);
  });


  it('should render input elements', () => {
    const _elements_ = fixture.debugElement.nativeElement;
    const emailInput = _elements_.querySelector('input[name="email"]');
    expect(emailInput).toBeTruthy();
  });


  it('form should be valid', () => {
    component.ionicFormRecover.controls['emailRecover'].setValue('test@hotmail.fr');
    expect(component.ionicFormRecover.valid).toBeTruthy();
  });



});
