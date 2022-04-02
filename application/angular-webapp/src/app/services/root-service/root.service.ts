import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap , catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CredentialsIn } from 'src/app/interfaces/credentials/credentials-in';
import { UserIn } from 'src/app/interfaces/user/user-in';
import { UserOut } from 'src/app/interfaces/user/user-out';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(
    private http:HttpClient,
    private storageService:StorageService
  ) { }

  private host = environment.host
  private port = environment.port

  login(credentials:CredentialsIn): Observable<UserOut>
  {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    const url = `http://${this.host}:${this.port}/login`
    return this.http.post<UserOut>(url,credentials,{headers:reqHeader})
                    .pipe(
                      tap( (data:UserOut) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }


  register(user:UserIn): Observable<UserOut>
  {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    const url = `http://${this.host}:${this.port}/register`
    return this.http.post<UserOut>(url,user,{ headers: reqHeader })
                    .pipe(
                      tap( (data:UserOut) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }


  forgotPassword(email:object): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/forgotPassword`
    return this.http.post<any>(url,email)
                    .pipe(
                      tap( (data:any) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }

  async logout()
  {
    await this.storageService.remove("access_token")
    await this.storageService.remove("expiresIn")
    return location.href = "/"
  }


  hasToken()
  {
    return !!this.storageService.get("access_token")
  }

  private handleError(error:any)
  {
    let errorMessage = ""

    if( error.error instanceof ErrorEvent ) errorMessage = `Error : ${error.error.message}`
    else errorMessage = `Error code : ${error.status} \t Message : ${error.message}`

    console.log(errorMessage);

    return throwError( () => {
      return errorMessage
    })
    
  }

}
