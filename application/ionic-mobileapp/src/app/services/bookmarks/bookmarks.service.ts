import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { IBookmarkIn, IBookmarkOut } from 'src/app/interfaces/IBookmark';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor(
    private http:HttpClient
  ) { }

  private host = environment.host
  private port = environment.port

  getAllBookmarks():Observable<IBookmarkOut[]>
  {
    const url = `http://${this.host}:${this.port}/bookmarks`
    return this.http.get<IBookmarkOut[]>(url)
    .pipe(
      tap( (data:IBookmarkOut[]) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }


  getBookmarkById(id:number):Observable<IBookmarkOut>
  {
    const url = `http://${this.host}:${this.port}/bookmarks/${id}`
    return this.http.get<IBookmarkOut>(url)
    .pipe(
      tap( (data:IBookmarkOut) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }


  addBookmark(bookmark:IBookmarkIn):Observable<IBookmarkOut>
  {
    const url = `http://${this.host}:${this.port}/bookmarks`
    return this.http.post<IBookmarkOut>(url,bookmark)
    .pipe(
      tap( (data:IBookmarkOut) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateBookmark(bookmark:IBookmarkIn,id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/bookmarks/${id}`
    return this.http.put<any>(url,bookmark)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteBookmark(id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/bookmarks/${id}`
    return this.http.delete(url)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
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
