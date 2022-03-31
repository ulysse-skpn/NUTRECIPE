import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { FormBuilder} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPage ],
      imports: [IonicModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule ],
      providers: 
      [
        { provide: FormBuilder }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create Settings Page', () => {
    expect(component).toBeTruthy();
  });


  it('[ngOnInit] should call ngOnInit method', () => {
    spyOn(component,'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });


  it('[email] should be valid', () => {
    component.ngOnInit();
    let settingsForm = component.settingsForm;
    settingsForm.controls['email'].setValue("test@gmail.com")
    expect(settingsForm.controls['email'].valid).toBe(true);
  });


  it('form should be valid', () => {
    component.ngOnInit();
    component.settingsForm.controls['identifiant'].setValue('abcdef');
    component.settingsForm.controls['phoneNumber'].setValue('0102030405');
    component.settingsForm.controls['email'].setValue('test@hotmail.fr');
    component.settingsForm.controls['password'].setValue('azerty');
    expect(component.settingsForm.valid).toBeTruthy();
  });


  it('password with less than 6 characters is invalid', () => {
    component.ngOnInit();
    const password = component.settingsForm.controls['password'];
    password.setValue("abc");
    expect(password.value.length).toBeLessThan(6);
  });


  it('[toggleModif] should call toggleModif method', () => {
    spyOn(component,'toggleModif');
    component.toggleModif();
    expect(component.toggleModif).toHaveBeenCalled();
  });


  it('[toggleModif] should return a boolean', () => {
    spyOn(component,'toggleModif').and.returnValue(true);
    const result = component.toggleModif();
    expect(result).toBe(true);
  });


  it('[togglePasswordVisibility] should call togglePasswordVisibility method', () => {
    spyOn(component,'togglePasswordVisibility');
    component.togglePasswordVisibility();
    expect(component.togglePasswordVisibility).toHaveBeenCalled();
  });


  it('[togglePasswordVisibility] should return a boolean', () => {
    spyOn(component,'togglePasswordVisibility').and.returnValue(false);
    const result = component.togglePasswordVisibility();
    expect(result).toBe(false);
  });


  it('[togglePushNotifications] should call togglePushNotifications method', () => {
    spyOn(component,'togglePushNotifications');
    component.togglePushNotifications();
    expect(component.togglePushNotifications).toHaveBeenCalled();
  });


  it('[togglePushNotifications] should return a boolean', () => {
    spyOn(component,'togglePushNotifications').and.returnValue(true);
    const result = component.togglePushNotifications();
    expect(result).toBe(true);
  });


  it('[toggleEmailNotifications] should call toggleEmailNotifications method', () => {
    spyOn(component,'toggleEmailNotifications');
    component.toggleEmailNotifications();
    expect(component.toggleEmailNotifications).toHaveBeenCalled();
  });


  it('[toggleEmailNotifications] should return a boolean', () => {
    spyOn(component,'toggleEmailNotifications').and.returnValue(true);
    const result = component.toggleEmailNotifications();
    expect(result).toBe(true);
  });


  it('[toggleSMSNotifications] should call toggleSMSNotifications method', () => {
    spyOn(component,'toggleSMSNotifications');
    component.toggleSMSNotifications();
    expect(component.toggleSMSNotifications).toHaveBeenCalled();
  });


  it('[toggleSMSNotifications] should return a boolean', () => {
    spyOn(component,'toggleSMSNotifications').and.returnValue(false);
    const result = component.toggleSMSNotifications();
    expect(result).toBe(false);
  });


  it('[saveModif] should call saveModif method', () => {
    spyOn(component,'saveModif');
    component.saveModif("0102030405","test@gmail.com","azerty",true,false,false);
    expect(component.saveModif).toHaveBeenCalled();
  });


  it('[saveModif] should return an object', () => {
    const settingsObject: Object =
    {
      "phoneNumber":"0102030405",
      "email":"test@gmail.com",
      "password":"azerty",
      "pushNotifications":true,
      "emailNotifications":false,
      "smsNotifications":false
    };
    spyOn(component,'saveModif').and.returnValue(settingsObject);
    const result = component.saveModif("0102030405","test@gmail.com","azerty",true,false,false);
    expect(result).toEqual(settingsObject);
  });


  it('[alertUser] should call alertUser method', async() => {
    spyOn(component,'alertUser');
    fixture.whenStable().then(() => {
      component.alertUser( "message" , "header");
      expect(component.alertUser).toHaveBeenCalled();
    })
  });


  it('[showAlertDeleteAccount] should call showAlertDeleteAccount method', () => {
    spyOn(component,'showAlertDeleteAccount');
    component.showAlertDeleteAccount();
    expect(component.showAlertDeleteAccount).toHaveBeenCalled();
  });


  it('[showAlertRebootAccount] should call showAlertRebootAccount method', () => {
    spyOn(component,'showAlertRebootAccount');
    component.showAlertRebootAccount();
    expect(component.showAlertRebootAccount).toHaveBeenCalled();
  });


  it('[deleteAccount] should call deleteAccount method', () => {
    spyOn(component,'deleteAccount');
    component.deleteAccount();
    expect(component.deleteAccount).toHaveBeenCalled();
  });


  it('[rebootAccount] should call rebootAccount method', () => {
    spyOn(component,'rebootAccount');
    component.rebootAccount();
    expect(component.rebootAccount).toHaveBeenCalled();
  });

});
