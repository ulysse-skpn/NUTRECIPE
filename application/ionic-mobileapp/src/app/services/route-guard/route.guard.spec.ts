import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';

import { RouteGuard } from './route.guard';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

fdescribe('RouteGuard', () => {
  let authService: AuthService
  let routeGuard: RouteGuard;
  let httpMock: HttpTestingController
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/login'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  const authServiceSpy = jasmine.createSpyObj("AuthService",
  ['isLoggedIn'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RouteGuard ,
      {
        provide: Router , useValue:routeMock
      },
      {
        provide: AuthService , useValue: authServiceSpy
      }
    ]
    });
    routeGuard = TestBed.inject(RouteGuard);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Route guard service should be created', () => {
    expect(routeGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access protected routes', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true)
    expect(routeGuard.canActivate(routeMock, routeStateMock)).toEqual(true)
  });

  // it('should not allow the user to access protected routes', () => { //?
  //   authServiceSpy.isLoggedIn.and.returnValue(false)
  // });

});
