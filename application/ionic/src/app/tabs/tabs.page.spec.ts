import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsPage } from './tabs.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let authService: AuthService;
  let storageService: Storage;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule , HttpClientModule , HttpClientTestingModule],
      declarations: [TabsPage],
      providers:
      [
        { provide: DrawerComponent },
        { provide: AuthService , useValue: authServiceSpy },
        { provide: Storage , useValue : storageService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Tabs Page', () => {
    expect(component).toBeTruthy();
  });
});
