import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page'

import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { JwtModule } from "@auth0/angular-jwt";
import { By } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


export function tokenGetter() {
    return sessionStorage.getItem("access_token");
}

fdescribe('ForgotPasswordPage', () => {
    let component: ForgotPasswordPage;
    let fixture: ComponentFixture<ForgotPasswordPage>;
    let el:HTMLElement

    beforeEach(waitForAsync( () => {
        TestBed.configureTestingModule({
        declarations: [ ForgotPasswordPage ],
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

        fixture = TestBed.createComponent(ForgotPasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create Forgot Password Page', () => {
        expect(component).toBeTruthy();
    });

    it('should call goBack', () => {
        fixture.detectChanges()
        spyOn<ForgotPasswordPage , any>(component,'goBack')
        el = fixture.debugElement.query(By.css('.returnButton')).nativeElement
        el.click()
        expect(component.goBack).toHaveBeenCalled()
    });

    it('should call getNewPassword', () => {
        component.forgotPasswordFormGroup.controls['emailControl'].setValue('test@test.com')
        spyOn<ForgotPasswordPage , any>(component,'getNewPassword').and.callThrough()
        component.getNewPassword()
        expect(component.getNewPassword).toHaveBeenCalled()
    });

    it('on startup , newPassword should be an empty string', () => {
        expect(component.newPassword.length).toEqual(0)
    });

    // it('When getNewPassword is called , a new password is displayed', () => {//?

        

    // });

    it('form should be valid', () => {
        component.forgotPasswordFormGroup.controls['emailControl'].setValue('test@test.com');
        expect(component.forgotPasswordFormGroup.valid).toBeTruthy();
    });

    it('form should be invalid', () => {
        component.forgotPasswordFormGroup.controls['emailControl'].setValue(null);
        expect(component.forgotPasswordFormGroup.invalid).toBeTruthy();
    });

});
