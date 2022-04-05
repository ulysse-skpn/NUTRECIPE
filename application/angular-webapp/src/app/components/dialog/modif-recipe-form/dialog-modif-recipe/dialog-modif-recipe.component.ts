import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipeIn, IRecipeOut } from 'src/app/interfaces/IRecipe';
import { RecipesPageComponent } from 'src/app/components/recipesPage/recipes-page/recipes-page.component';

@Component({
  selector: 'app-dialog-modif-recipe',
  templateUrl: './dialog-modif-recipe.component.html',
  styleUrls: ['./dialog-modif-recipe.component.css']
})
export class DialogModifRecipeComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<RecipesPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private recipeService: RecipesService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  id!:number
  selectedRecipe!: IRecipeOut

  recipeFormGroup = new FormGroup({
    titleControl : new FormControl(),
    prepTimeControl : new FormControl(),
    cookingTimeControl : new FormControl(),
    restTimeControl : new FormControl(),
    categoriesControl : new FormControl(),
    ingredientsListControl : new FormControl(),
    servingSizeControl : new FormControl(),
    instructionsControl : new FormControl(),
    imageControlUrl : new FormControl(),
    imageControlFile : new FormControl()
  })

  ngOnInit(): void 
  {
    this.recipeService.getRecipeById(this.data.id).subscribe( (res:IRecipeOut) => {
      this.selectedRecipe = res
      this.id = res.id

      const ingredients_list = res.ingredients_list.replace(/[".]/g,"").slice(1,-1)
      const instructions = res.instructions.replace(/[".]/g,"").slice(1,-1)
      const categories = res.categories.replace(/[".]/g,"").slice(1,-1)

      this.recipeFormGroup = new FormGroup({
        titleControl : new FormControl( res.title ,[Validators.required]),
        prepTimeControl : new FormControl( res.prep_time ),
        cookingTimeControl : new FormControl( res.cooking_time ),
        restTimeControl : new FormControl( res.rest_time ),
        categoriesControl : new FormControl( categories ),
        ingredientsListControl : new FormControl( ingredients_list ,[Validators.required]),
        servingSizeControl : new FormControl( res.serving_size ,[Validators.required]),
        instructionsControl : new FormControl( instructions ,[Validators.required]),
        imageControlUrl : new FormControl( res.image ),
        imageControlFile : new FormControl( null )
      })
    })
  }

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

    if( form.ingredientsListControl ) ingredients_list = this.formatString(form.ingredientsListControl)
    else ingredients_list = ""

    if( form.instructionsControl ) instructions = this.formatString(form.instructionsControl)
    else instructions = ""

    if( form.categoriesControl ) categories = this.formatString(form.categoriesControl)
    else categories = ""

    const id = this.id
    const title = form.titleControl === undefined ? null : form.titleControl
    const prepTime = form.prepTimeControl === undefined ? null : form.prepTimeControl
    const cookingTime = form.cookingTimeControl === undefined ? null : form.cookingTimeControl
    const restTime = form.restTimeControl === undefined ? null : form.restTimeControl
    const serving_size = form.servingSizeControl === undefined ? null : form.servingSizeControl

    const recipe:IRecipeIn =
    {
      title: title,
      prep_time: prepTime,
      cooking_time: cookingTime,
      rest_time: restTime,
      categories: categories,
      ingredients_list: ingredients_list,
      serving_size: serving_size,
      instructions: instructions,
      image: image
    }
    
    const snackBarRef = this.snackBar.open( "Annuler action : 'Modifier Recette'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.recipeService.updateRecipe(recipe,id).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Elément modifié" , "" , { duration: 3000 } )
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
  
  formatString( string:string )
  {
    string = string.replace(/[\[\]']+/g," ")
    string = string.replace(/[.]/g ," ")
    string = string.replace(/[,]/g ,";")
    string = JSON.stringify(string.split(";"))
    return string
  }
}
