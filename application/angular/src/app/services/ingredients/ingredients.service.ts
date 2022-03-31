import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, pipe } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IIngredient } from 'src/app/interfaces/iingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    private http: HttpClient
  ) {}

  host = environment.host;
  port = environment.port;
  
  getListLength(): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/ingredients/length`;
    return this.http.get<any>(url)
      .pipe(
        tap( data => data = data[0] ),
        map( item => item[0].listLength ),
        catchError(this.handleError<any>('getListLength', []))
      )
  }

  getAllIngredients(): Observable<IIngredient[]>
  {
    const url = `http://${this.host}:${this.port}/ingredients/all`;
    return this.http.get<IIngredient[]>(url)
      .pipe(
        tap( data => console.log(`getAllIngredients() : ${data}`) ),
        catchError(this.handleError<IIngredient[]>('getAllIngredients', []))
      )
  }

  getAllIngredientsPagination( page: number , pageSize: number ): Observable<IIngredient[]>
  {
    const url = `http://${this.host}:${this.port}/ingredients/pagination?page=${page}&pageSize=${pageSize}`;
    return this.http.get<IIngredient[]>(url)
      .pipe(
        tap( (data) => 
        {
          console.log({page});
          console.log({pageSize});
          console.log(data);
        }),
        catchError(this.handleError<IIngredient[]>('getAllIngredientsPagination', []))
      )
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
