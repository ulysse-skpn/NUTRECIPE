import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from 'src/app/pages/login/login/login.page';

import { SideMenuComponent } from './side-menu.component';

function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

describe('SideMenuComponent', () => {
  let component: SideMenuComponent
  let fixture: ComponentFixture<SideMenuComponent>
  let el:HTMLElement
  let jwtHelper: JwtHelperService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ],
      imports: 
      [
        IonicModule.forRoot() , HttpClientTestingModule , ReactiveFormsModule , FormsModule , BrowserModule , CommonModule , RouterTestingModule.withRoutes(
          [
            {
                path:'login' , component:LoginPage
            }
          ]
      ),
      JwtModule.forRoot({
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
      })
    ],
    providers: [ JwtHelperService ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    jwtHelper = TestBed.inject(JwtHelperService)
  }));

  it('should create Side Menu Component', () => {
    expect(component).toBeTruthy()
  });

  it('should call ngOnInit method with access_token in sessionStorage', () => {
    fixture.detectChanges(false)
    sessionStorage.setItem("access_token","test")
    fixture.detectChanges()
    spyOn<SideMenuComponent,any>(component,'ngOnInit').and.callThrough()
    component.ngOnInit()
    expect(component.ngOnInit).toHaveBeenCalled()
  });

  it('should call getStats method', () => {
    spyOn<SideMenuComponent,any>(component,'getStats').and.callThrough()
    component.getStats()
    expect(component.getStats).toHaveBeenCalled()
  });

  it('should call getNotifications method', () => {
    spyOn<SideMenuComponent,any>(component,'getNotifications').and.callThrough()
    component.getNotifications()
    expect(component.getNotifications).toHaveBeenCalled()
  });


  it('should call goToLogin method', async() => {
    spyOn(component,'goToLogin').and.callThrough()
    component.visible = false
    fixture.detectChanges()

    el = fixture.debugElement.query(By.css(".goToLogin")).nativeElement
    el.click()
    
    expect(el).toBeDefined()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      expect(component.goToLogin).toHaveBeenCalled()
    })  
  })

  it('should call logout method', async() => {
    spyOn(component,'logout').and.callThrough()
    component.visible = true
    fixture.detectChanges()

    el = fixture.debugElement.query(By.css(".logout")).nativeElement
    el.click()
    
    expect(el).toBeDefined()

    fixture.whenStable().then( () => {
      fixture.detectChanges()
      expect(component.logout).toHaveBeenCalled()
    })  
  })

});
