import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';

import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { JwtModule } from "@auth0/angular-jwt";
import { By } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

fdescribe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let el:HTMLElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
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
      })],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create Register Page', () => {
    expect(component).toBeTruthy();
  });

  it('should call goBack', () => {
    fixture.detectChanges()
    spyOn<RegisterPage , any>(component,'goBack')
    el = fixture.debugElement.query(By.css('.returnButton')).nativeElement
    el.click()
    expect(component.goBack).toHaveBeenCalled()
  });

  it('form should be valid', () => {
    component.registerFormGroup.controls['lastNameControl'].setValue('sekpon');
    component.registerFormGroup.controls['firstNameControl'].setValue('ulysse');
    component.registerFormGroup.controls['phoneNumberControl'].setValue('0102030405');
    component.registerFormGroup.controls['emailControl'].setValue('test@test.com');
    component.registerFormGroup.controls['passwordControl'].setValue('azerty');
    component.registerFormGroup.controls['passwordConfirmControl'].setValue('azerty');
    expect(component.registerFormGroup.valid).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.registerFormGroup.controls['lastNameControl'].setValue(null);
    component.registerFormGroup.controls['firstNameControl'].setValue(null);
    component.registerFormGroup.controls['phoneNumberControl'].setValue(null);
    component.registerFormGroup.controls['emailControl'].setValue(null);
    component.registerFormGroup.controls['passwordControl'].setValue(null);
    component.registerFormGroup.controls['passwordConfirmControl'].setValue(null);
    expect(component.registerFormGroup.invalid).toBeTruthy();
  });

  it('form should be invalid even if some inputs are filled', () => {
    component.registerFormGroup.controls['lastNameControl'].setValue('sekpon');
    component.registerFormGroup.controls['firstNameControl'].setValue('ulysse');
    component.registerFormGroup.controls['phoneNumberControl'].setValue('0102030405');
    component.registerFormGroup.controls['emailControl'].setValue(null);
    component.registerFormGroup.controls['passwordControl'].setValue(null);
    component.registerFormGroup.controls['passwordConfirmControl'].setValue(null);
    expect(component.registerFormGroup.invalid).toBeTruthy();
  });

  it('form should be invalid if the password and the confirm password inputs are not the same', () => {
    component.registerFormGroup.controls['lastNameControl'].setValue('sekpon');
    component.registerFormGroup.controls['firstNameControl'].setValue('ulysse');
    component.registerFormGroup.controls['phoneNumberControl'].setValue('0102030405');
    component.registerFormGroup.controls['emailControl'].setValue('test@test.com');
    component.registerFormGroup.controls['passwordControl'].setValue('azerty');
    component.registerFormGroup.controls['passwordConfirmControl'].setValue(null);
    expect(component.registerFormGroup.invalid).toBeTruthy();
  });

});
