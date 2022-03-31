import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { AuthService } from '../services/auth/auth.service';
import { IonicStorageModule } from '@ionic/storage';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let authService: AuthService;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  const storageServiceSpy = jasmine.createSpyObj('Storage',
  ['get', 'set', 'remove', 'clear']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule],
      providers:
      [
        { provide: AuthService , useValue: authServiceSpy },
        { provide: DrawerComponent },
        { provide: Storage , useValue: storageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create Tab 1 page', () => {
    expect(component).toBeTruthy();
  });
  // it('should create Tab 1 page', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should create Tab 1 page', () => {
  //   expect(component).toBeTruthy();
  // });

});
