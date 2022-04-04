import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientsPageComponent } from 'src/app/components/ingredientsPage/ingredients-page/ingredients-page.component';
import { IIngredientIn } from 'src/app/interfaces/ingredients/IIngredientIn';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'app-dialog-add-ingredient',
  templateUrl: './dialog-add-ingredient.component.html',
  styleUrls: ['./dialog-add-ingredient.component.css']
})
export class DialogAddIngredientComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<IngredientsPageComponent>,
    private ingredientService: IngredientsService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  nova_group = 
  [
    { name:"ONE" , value:"1" , text:"Aliments peu ou non transformés" },
    { name:"TWO" , value:"2" , text:"Ingrédients culinaires" },
    { name:"THREE" , value:"3" , text:"Aliments transformés" },
    { name:"FOUR" , value:"4" , text:"Aliments ultratransformés" }
  ]

  ingredientFormGroup = new FormGroup({
    productNameControl : new FormControl("",[Validators.required , Validators.minLength(2)]),
    ingredientTextControl : new FormControl("",[Validators.required , Validators.minLength(2)]),
    carbohydratesControl : new FormControl( null , [Validators.required]),
    proteinsControl : new FormControl( null , [Validators.required]),
    fatsControl : new FormControl( null , [Validators.required]),
    saltControl : new FormControl( null , [Validators.required]),
    caloriesControl : new FormControl( null , [Validators.required]),
    novaGroupControl : new FormControl("",[Validators.required]),
    servingSizeControl : new FormControl("",[Validators.required]),
    quantityControl: new FormControl(0),
    statusControl: new FormControl(0),
    categoriesControl : new FormControl(""),
    imageControlUrl : new FormControl( null ),
    imageControlFile : new FormControl( null )
  })

  ngOnInit(): void {
  }

  onNoClick()
  {
    this.dialogRef.close()
  }

  save()
  {
    let form = this.ingredientFormGroup.value
    
    const image = form.imageControlUrl ? form.imageControlUrl : form.imageControlFile

    let ingredient_text
    let categories

    if( form.ingredientTextControl )
    {
      ingredient_text = form.ingredientTextControl
      ingredient_text = ingredient_text.replace(/[".]/g ," ")
      ingredient_text = ingredient_text.replace(/[",]/g ,";")
      ingredient_text = ingredient_text.split(" ")
      ingredient_text = JSON.stringify(ingredient_text)
    }
    else ingredient_text = ""

    if( form.categoriesControl )
    {
      categories = form.categoriesControl
      categories = categories.replace(/[".]/g ," ")
      categories = categories.replace(/[",]/g ,";")
      categories = categories.split(" ")
      categories = JSON.stringify(categories)
    }
    else categories = form.categoriesControl = ""

    const carbohydrates = parseFloat(form.carbohydratesControl) || 0
    const proteins = parseFloat(form.proteinsControl) || 0
    const fats = parseFloat(form.fatsControl) || 0
    const salt = parseFloat(form.saltControl) || 0
    const calories = parseFloat(form.caloriesControl) || 0

    const ingredient:IIngredientIn =
    {
      product_name: form.productNameControl,
      ingredient_text: ingredient_text,
      carbohydrates: carbohydrates,
      proteins: proteins,
      fats: fats,
      salt: salt,
      calories: calories,
      nova_group: form.novaGroupControl,
      categories: categories,
      serving_size: form.servingSizeControl,
      quantity: 0,
      status: false,
      image: image,
    }

    if( !this.ingredientFormGroup.valid ) return
    
    const snackBarRef = this.snackBar.open( "Annuler action : 'Ajouter ingrédient'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.ingredientService.addIngredient(ingredient).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Elément ajouté" , "" , { duration: 3000 } )
        snackBarRef_.afterDismissed().subscribe(() => {
          this.route.navigate(["/","ingredients"])
        })
      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.ingredientFormGroup.controls[controlName].hasError(errorName)
  }
}
