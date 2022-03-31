import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3Page } from './tab3.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth/auth.service';
import { DrawerComponent } from '../components/drawer/drawer.component';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let authService: AuthService;

  const authServiceSpy = jasmine.createSpyObj('AuthService',
  ['register', 'login', 'isLoggedIn', 'logOut']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule , RouterTestingModule , HttpClientModule , HttpClientTestingModule],
      providers:
      [
        {provide: DrawerComponent},
        { provide: AuthService , useValue: authServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create Tab 3 page', () => {
    expect(component).toBeTruthy();
  });
});
