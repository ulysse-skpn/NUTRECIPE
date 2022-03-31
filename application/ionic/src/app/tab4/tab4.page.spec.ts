import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab4Page } from './tab4.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { AuthService } from '../services/auth/auth.service';

describe('Tab4Page', () => {
  let component: Tab4Page;
  let fixture: ComponentFixture<Tab4Page>;
  let authService: AuthService;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab4Page ],
      imports: [IonicModule.forRoot() , RouterTestingModule , HttpClientModule , HttpClientTestingModule],
      providers:
      [
        {provide: DrawerComponent},
        { provide: AuthService , useValue: authServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create Tab 4 Page', () => {
    expect(component).toBeTruthy();
  });
});
