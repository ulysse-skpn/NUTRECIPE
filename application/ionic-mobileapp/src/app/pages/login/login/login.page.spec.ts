import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { JwtModule } from "@auth0/angular-jwt";
import { By } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let el:HTMLElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot() , RouterTestingModule , HttpClientTestingModule , ReactiveFormsModule , FormsModule , JwtModule.forRoot({
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
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create Login Page', () => {
    expect(component).toBeTruthy();
  });

  it('should call onFormSubmit method', () => {
    fixture.detectChanges()
    spyOn<LoginPage , any>(component,'onFormSubmit')
    el = fixture.debugElement.query(By.css('.valButton')).nativeElement
    el.click()
    expect(component.onFormSubmit).toHaveBeenCalled()
  });

  it('should call goToRegister method', () => {
    fixture.detectChanges()
    spyOn<LoginPage , any>(component,'goToRegister')
    el = fixture.debugElement.query(By.css('.goToRegisterButton')).nativeElement
    el.click()
    expect(component.goToRegister).toHaveBeenCalled()
  });

  it('should call goToForgotPassword method', () => {
    fixture.detectChanges()
    spyOn<LoginPage , any>(component,'goToForgotPassword')
    el = fixture.debugElement.query(By.css('.goToForgotPasswordButton')).nativeElement
    el.click()
    expect(component.goToForgotPassword).toHaveBeenCalled()
  });

  it('should render input elements', () => {
    const _elements_ = fixture.debugElement.nativeElement;
    const emailInput = _elements_.querySelector('.email');
    const passwordInput = _elements_.querySelector('.password');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('form should be invalid when email and password inputs are empty', () => {
    component.ngOnInit();
    component.loginFormGroup.controls['emailControl'].setValue('');
    component.loginFormGroup.controls['passwordControl'].setValue('');
    expect(component.loginFormGroup.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.ngOnInit();
    component.loginFormGroup.controls['emailControl'].setValue('test@hotmail.fr');
    component.loginFormGroup.controls['passwordControl'].setValue('azerty');
    expect(component.loginFormGroup.valid).toBeTruthy();
  });

  
  it('email is not null but invalid', () => {
    component.ngOnInit();
    const email = component.loginFormGroup.controls['emailControl'];
    email.setValue("a");
    expect(email.valid).toBe(false);
  });


  it('email is not null and valid', () => {
    component.ngOnInit();
    const email = component.loginFormGroup.controls['emailControl'];
    email.setValue("a@gmail.com");
    expect(email.valid).toBe(true);
  });


  it('password with less than 6 characters is invalid', () => {
    component.ngOnInit();
    const password = component.loginFormGroup.controls['passwordControl'];
    password.setValue("abc");
    expect(password.value.length).toBeLessThan(6);
  });

});
