import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { tap , catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IIngredient } from 'src/app/interfaces/ingredients/IIngredients';
import { IIngredientIn } from 'src/app/interfaces/ingredients/IIngredientIn';
import { IIngredientOut } from 'src/app/interfaces/ingredients/ingredientOut';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    private http:HttpClient
  ) { }

  private host = environment.host
  private port = environment.port

  getSizeArrayIngredients():Observable<any>
  {
    const url = `http://${this.host}:${this.port}/ingredients/size`
    return this.http.get(url)
    .pipe(
      tap( (data:any) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllIngredients(pageIndex:number,pageSize:number):Observable<IIngredient[]>
  {
    const url = `http://${this.host}:${this.port}/ingredients/pagination`
    return this.http.post<IIngredient[]>(url,{pageIndex,pageSize})
    .pipe(
      tap( (data:IIngredient[]) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getIngredientById(id:number):Observable<IIngredient>
  {
    const url = `http://${this.host}:${this.port}/ingredients/${id}`
    return this.http.get<IIngredient>(url)
    .pipe(
      tap( (data:IIngredient) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  addIngredient(ingredient:IIngredientIn):Observable<IIngredient>
  {
    const url = `http://${this.host}:${this.port}/ingredients`
    return this.http.post<IIngredient>(url,ingredient)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateIngredient(ingredient:IIngredientIn,id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/ingredients/${id}`
    return this.http.put<IIngredientOut>(url,ingredient)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteIngredient(id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/ingredients/${id}`
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
