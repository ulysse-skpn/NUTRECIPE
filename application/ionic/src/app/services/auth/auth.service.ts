import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject, pipe } from 'rxjs';
import { Storage } from  '@ionic/storage';
import { RegisterIn } from '../../interfaces/user/register_in';
import { UserIn } from '../../interfaces/user/user-in';
import { UserOut } from 'src/app/interfaces/user/user-out';
import { tap, catchError } from 'rxjs/operators';
import { RegisterOut } from 'src/app/interfaces/user/register-out';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private  storageService: Storage
  ) { }
  
  host = '127.0.0.1';
  // port = '8100';
  port = '3000';
  authSubject  =  new  BehaviorSubject<boolean>(this.hasToken());

  register(user: RegisterIn): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/register`;
    return this.http.put( url , user )
      .pipe(
        tap( data => 
          {
            console.log(data);
            this.authSubject.next(true);
          }),
        catchError(this.handleError<any>('register'))
      );
  }

  login(user: UserIn): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/login`;
    return this.http.post( url , user )
      .pipe(
        tap( data => {
          console.log(data);
          this.authSubject.next(true);
        }),
        catchError(this.handleError<any>('login'))
      );
  }

  async logout() 
  {
    await this.storageService.remove("ACCESS_TOKEN");
    await this.storageService.remove("EXPIRES_IN");
    this.authSubject.next(false);
    return location.href = "/login";
  }

  isLoggedIn()
  {
    return this.authSubject.asObservable();
  }

  hasToken()
  {
    return !!this.storageService.get("ACCESS_TOKEN");
  }


      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) 
    {
      return (error: any): Observable<T> => {
    
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return (error);
      };
    }
}
