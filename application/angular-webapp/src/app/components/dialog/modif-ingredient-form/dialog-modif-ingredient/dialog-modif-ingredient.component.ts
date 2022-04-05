import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientsPageComponent } from 'src/app/components/ingredientsPage/ingredients-page/ingredients-page.component';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { IIngredientOut } from 'src/app/interfaces/IIngredient';

@Component({
  selector: 'app-dialog-modif-ingredient',
  templateUrl: './dialog-modif-ingredient.component.html',
  styleUrls: ['./dialog-modif-ingredient.component.css']
})
export class DialogModifIngredientComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<IngredientsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
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

  id!:number
  selectedIngredient!: IIngredientOut

  ingredientFormGroup = new FormGroup({
    productNameControl : new FormControl(),
    ingredientTextControl : new FormControl(),
    carbohydratesControl : new FormControl(),
    proteinsControl : new FormControl(),
    fatsControl : new FormControl(),
    saltControl : new FormControl(),
    caloriesControl : new FormControl(),
    novaGroupControl : new FormControl(),
    servingSizeControl : new FormControl(),
    quantityControl: new FormControl(),
    statusControl: new FormControl(),
    categoriesControl : new FormControl(),
    imageControlUrl : new FormControl(),
    imageControlFile : new FormControl()
  })

  ngOnInit(): void 
  {
    this.ingredientService.getIngredientById(this.data.id).subscribe( (res:IIngredientOut) => {
      this.selectedIngredient = res
      this.id = res.id

      const ingredient_text = res.ingredient_text.replace(/[".]/g,"").slice(1,-1)
      const categories = res.categories.replace(/[".]/g,"").slice(1,-1)

      this.ingredientFormGroup = new FormGroup({
        productNameControl : new FormControl(res.product_name,[Validators.required , Validators.minLength(2)]),
        ingredientTextControl : new FormControl( ingredient_text,[Validators.required , Validators.minLength(2)]),
        carbohydratesControl : new FormControl( res.carbohydrates , [Validators.required]),
        proteinsControl : new FormControl( res.proteins , [Validators.required]),
        fatsControl : new FormControl( res.fats , [Validators.required]),
        saltControl : new FormControl( res.salt , [Validators.required]),
        caloriesControl : new FormControl( res.calories , [Validators.required]),
        novaGroupControl : new FormControl(res.nova_group,[Validators.required]),
        servingSizeControl : new FormControl(res.serving_size,[Validators.required]),
        quantityControl: new FormControl(res.quantity),
        statusControl: new FormControl(res.status),
        categoriesControl : new FormControl( categories ),
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
    if( !this.ingredientFormGroup.valid ) return

    let form = this.ingredientFormGroup.value
    
    const image = form.imageControlUrl ? form.imageControlUrl : form.imageControlFile

    let ingredient_text
    let categories
    
    if( form.ingredientTextControl ) ingredient_text = this.formatString(form.ingredientTextControl)
    else ingredient_text = ""

    if( form.categoriesControl ) categories = this.formatString(form.categoriesControl)
    else categories = ""

    const carbohydrates = parseFloat(form.carbohydratesControl) || 0
    const proteins = parseFloat(form.proteinsControl) || 0
    const fats = parseFloat(form.fatsControl) || 0
    const salt = parseFloat(form.saltControl) || 0
    const calories = parseFloat(form.caloriesControl) || 0
    const quantity = form.quantityControl
    const status = form.statusControl === "true" ? true : false

    const ingredient:IIngredientOut =
    {
      id: this.id,
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
      quantity: quantity,
      status: status,
      image: image,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    
    const snackBarRef = this.snackBar.open( "Annuler action : 'Modifier ingrédient'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.ingredientService.updateIngredient(ingredient,this.id).subscribe( () => {
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
    return this.ingredientFormGroup.controls[controlName].hasError(errorName)
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
