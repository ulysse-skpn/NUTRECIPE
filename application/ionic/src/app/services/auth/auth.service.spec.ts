import { fakeAsync, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterIn } from 'src/app/interfaces/user/register_in';
import { UserIn } from 'src/app/interfaces/user/user-in';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule , HttpClientTestingModule , IonicStorageModule.forRoot() ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('register should call http PUT method for the given route', () => {
    const userToRegister : RegisterIn = {
      'last_name':'nom_de_famiile',
      'first_name':'prenom',
      'phone_number':'0102030405',
      'email':'test@gmail.com',
      'password':'azerty',
      'status':0
    };

    service.register(userToRegister).subscribe( user => {
      expect(user).toEqual(userToRegister);
    })

    const req = httpMock.expectOne('http://127.0.0.1:3000/register');
    
    expect(req.request.method).toEqual('PUT');

    req.flush(userToRegister);

    httpMock.verify();
  });


  it('login should call http POST method for the given route', () => {
    const user : UserIn = {
      'email':'test@gmail.com',
      'password':'azerty'
    };

    service.login(user).subscribe( usr => {
      expect(usr).toEqual(user);
    })

    const req = httpMock.expectOne('http://127.0.0.1:3000/login');
    
    expect(req.request.method).toEqual('POST');

    req.flush(user);

    httpMock.verify();
  });


  it( 'should call logout method', fakeAsync(() => {
      const serviceSpy = spyOn(service , 'logout');
      service.logout();
      expect(serviceSpy).toHaveBeenCalled();
  }));



  it( 'should call isLoggedIn method', () => {
      const serviceSpy = spyOn(service , 'isLoggedIn');
      service.isLoggedIn();
      expect(serviceSpy).toHaveBeenCalled();
  });


  it( 'isLoggedIn should return true', () => {
      service.authSubject = new BehaviorSubject(true);
      const result = service.isLoggedIn();
      result.subscribe(res => {
        expect(res).toBeTrue();
      })
  });


  it( 'isLoggedIn should return false', () => {
      service.authSubject = new BehaviorSubject(false);
      const result = service.isLoggedIn();
      result.subscribe(res => {
        expect(res).toBeFalse();
      })
  });


});
