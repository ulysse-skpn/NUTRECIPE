import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: 
      [
        { provide: AuthService , useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display a different app title', () => {
  //   component
  //   expect(component).toBeTruthy();
  // });

  it('should call openDrawer method', () => {
    fixture.detectChanges();
    spyOn(component,'openDrawer');
    component.openDrawer();
    expect(component.openDrawer).toHaveBeenCalledTimes(1);
  });

  it('should call closeDrawer method', () => {
    fixture.detectChanges();
    spyOn(component,'closeDrawer');
    component.closeDrawer();
    expect(component.closeDrawer).toHaveBeenCalledTimes(1);
  });

  it('should call signOut method', async() => {
    fixture.detectChanges();
    spyOn(component,'signOut');
    fixture.whenStable().then(() => { 
      component.signOut();
      expect(component.signOut).toHaveBeenCalledTimes(1);
    })
  });
});
