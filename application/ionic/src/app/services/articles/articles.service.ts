import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientIn } from '../../interfaces/ingredients/ingredient-in';
import { IngredientOut } from '../../interfaces/ingredients/ingredient-out';
import { RecipeIn } from '../../interfaces/recipes/recipe-in';
import { RecipeOut } from '../../interfaces/recipes/recipe-out';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient
  ) { }

  // host = 'localhost';
  // port = '8100';
  host = '127.0.0.1';
  port = '3000';

  items:any = [];
  //======================
  // GET ALL & GET BY ID
  //======================
  getAllIngredients(): Observable<IngredientOut[]> 
  {
    const url = `http://${this.host}:${this.port}/ingredients/all`;
    return this.http.get<IngredientOut[]>(url)
      .pipe(
        tap( data => console.log(data) ),
        catchError(this.handleError<IngredientOut[]>('getAllIngredients', []))
      );
  }

  getAllRecipes(): Observable<RecipeOut[]> 
  {
    const url = `http://${this.host}:${this.port}/recipes/all`;
    return this.http.get<RecipeOut[]>(url)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError<RecipeOut[]>('getAllRecipes', []))
      )
  }

  getIngredient(ingredientID: number): Observable<IngredientOut>
  {
    const url = `http://${this.host}:${this.port}/ingredients/ingredient/${ingredientID}`;
    return this.http.get<IngredientOut>(url)
      .pipe(
        tap( data => console.log(`id=${data.idingredients} de l'ingrédient`)),
        catchError(this.handleError<IngredientOut>(`getIngredient id=${ingredientID}`))
      );
  }

  getRecipe(recipeID: number): Observable<RecipeOut>
  {
    const url = `http://${this.host}:${this.port}/recipes/recipe/${recipeID}`;
    return this.http.get<RecipeOut>(url)
      .pipe(
        tap( data => console.log(`id=${data[0][0].idrecipes} de la recette`)),
        catchError(this.handleError<RecipeOut>(`getIngredient id=${recipeID}`))
      );
  }



  //==================
  // ADD
  //==================
  addIngredient(ingredient: IngredientIn): Observable<IngredientIn>
  {
    const url = `http://${this.host}:${this.port}/ingredients/addIngredient`;
    return this.http.post<IngredientIn>(url, ingredient)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError<IngredientIn>(`addIngredient`))
      );
  }

  addRecipe(recipe: RecipeIn): Observable<RecipeIn>
  {
    const url = `http://${this.host}:${this.port}/recipes/addRecipe`;
    return this.http.post<RecipeIn>(url, recipe)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError<RecipeIn>(`addRecipe`))
      );
  }


  //==================
  // DELETE
  //==================
  deleteIngredient(ingredientID): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/ingredients/deleteIngredient/${ingredientID}`;
    return this.http.delete(url,ingredientID)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError<any>('deleteIngredient'))
      );
  }

  deleteRecipe(recipeID): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/recipes/deleteRecipe/${recipeID}`;
    return this.http.delete(url,recipeID)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError<any>('deleteRecipe'))
      );
  }


  //==================
  // UPDATE 
  //==================
  updateIngredient(ingredient: IngredientOut): Observable<IngredientOut>
  {
    const ingredientID = ingredient.idingredients;

    const url =`http://${this.host}:${this.port}/ingredients/updateIngredient/${ingredientID}`;
    return this.http.patch<IngredientOut>(url, ingredient)
      .pipe(
        tap( data => console.log(data) ),
        catchError(this.handleError<IngredientOut>('updateIngredient'))
      );
  }

  updateRecipe(recipe: RecipeOut): Observable<RecipeOut>
  {
    const recipeID = recipe.idrecipes;
  
    const url =`http://${this.host}:${this.port}/recipes/updateRecipe/${recipeID}`;
    return this.http.patch<RecipeOut>(url, recipe)
      .pipe(
        tap( data => console.log(data) ),
        catchError(this.handleError<RecipeOut>('updateRecipe'))
      );
  }


  filterItems(searchTerm) 
  {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
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
