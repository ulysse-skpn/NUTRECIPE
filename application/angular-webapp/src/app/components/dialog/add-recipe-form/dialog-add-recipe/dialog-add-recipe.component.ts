import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipeIn } from 'src/app/interfaces/IRecipe';
import { RecipesPageComponent } from 'src/app/components/recipesPage/recipes-page/recipes-page.component';

@Component({
  selector: 'app-dialog-add-recipe',
  templateUrl: './dialog-add-recipe.component.html',
  styleUrls: ['./dialog-add-recipe.component.css']
})
export class DialogAddRecipeComponent {

  constructor(
    public dialogRef:MatDialogRef<RecipesPageComponent>,
    private recipeService: RecipesService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  recipeFormGroup = new FormGroup({
    titleControl : new FormControl("",[Validators.required]),
    prepTimeControl : new FormControl(""),
    cookingTimeControl : new FormControl(""),
    restTimeControl : new FormControl(""),
    categoriesControl : new FormControl(""),
    ingredientsListControl : new FormControl("",[Validators.required]),
    servingSizeControl : new FormControl("",[Validators.required]),
    instructionsControl : new FormControl("",[Validators.required]),
    imageControlUrl : new FormControl( null ),
    imageControlFile : new FormControl( null )
  })

  onNoClick()
  {
    this.dialogRef.close()
  }

  save()
  {
    if( !this.recipeFormGroup.valid ) return
    
    let form = this.recipeFormGroup.value
    
    const image = form.imageControlUrl ? form.imageControlUrl : form.imageControlFile

    let ingredients_list , categories , instructions


    if( form.ingredientsListControl )
    {
      ingredients_list = form.ingredientsListControl
      ingredients_list = ingredients_list.replace(/[".]/g ," ")
      ingredients_list = ingredients_list.replace(/[",]/g ,";")
      ingredients_list = ingredients_list.split(" ")
      ingredients_list = JSON.stringify(ingredients_list)
    }
    else ingredients_list = ""

    if( form.categoriesControl )
    {
      categories = form.categoriesControl
      categories = categories.replace(/[".]/g ," ")
      categories = categories.replace(/[",]/g ,";")
      categories = categories.split(" ")
      categories = JSON.stringify(categories)
    }
    else categories = ""

    if( form.instructionsControl )
    {
      instructions = form.instructionsControl
      instructions = instructions.replace(/[".]/g ," ")
      instructions = instructions.replace(/[",]/g ,";")
      instructions = instructions.split(" ")
      instructions = JSON.stringify(instructions)
    }
    else instructions = ""

    const prepTime = form.prepTimeControl.length === 0 ? null : form.prepTimeControl
    const cookingTime = form.cookingTimeControl.length === 0 ? null : form.cookingTimeControl
    const restTime = form.restTimeControl.length === 0 ? null : form.restTimeControl

    const recipe:IRecipeIn =
    {
      title: form.title,
      prep_time: prepTime,
      cooking_time: cookingTime,
      rest_time: restTime,
      categories: categories,
      ingredients_list: ingredients_list,
      serving_size: form.serving_size,
      instructions: instructions,
      image: image
    }
    
    const snackBarRef = this.snackBar.open( "Annuler action : 'Ajouter Recette'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.recipeService.addRecipe(recipe).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Elément ajouté" , "" , { duration: 3000 } )
        snackBarRef_.afterDismissed().subscribe(() => {
          this.dialogRef.close()

          let currentUrl = this.route.url;
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate([currentUrl]);
        })
      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.recipeFormGroup.controls[controlName].hasError(errorName)
  }

}
