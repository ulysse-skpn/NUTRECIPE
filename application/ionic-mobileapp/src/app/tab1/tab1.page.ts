import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IRecipeOut } from '../interfaces/IRecipe';
import { RecipesService } from '../services/recipes/recipes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['./../../global.scss']
})
export class Tab1Page implements OnInit {

  visible:boolean = false
  searchTerm:string = ""
  recipeArraySize!:number
  recipeList:IRecipeOut[]
  selectTab:string = "icon"

  constructor(
    private recipeService:RecipesService,
    private toastController:ToastController
  ) {}

  ngOnInit(): void 
  {
    this.recipeService.getSizeArrayRecipes().subscribe( async(res) => {
      this.recipeArraySize = res.nbElem
    })

    this.loadRecipes()
  }

  loadRecipes()
  {
    this.recipeService.getAllRecipes().subscribe( async(res) => {
      return this.recipeList = res.slice(0,20)
    })
  }

  detail( id:number )
  {
    // alert('Page detail')
  }


  bookmark( item:any ) //?
  {
    item.isBookmarked = !item.isBookmarked
    
    let message!:string
    if( item.isBookmarked == true )
    {
      message = "Ajouté aux favoris"

      // this.recipeService. //?
    }
    else 
    {
      message = "Retrait des favoris"

      // this.recipeService. //?
    }
    this.showToast( message );
  }

  async showToast( message:string ){
    await this.toastController.create({
      message: message,
      duration:2000
    }).then(res => res.present());
  }

  expand(event:Event)
  {
    console.log(event);
    
    this.visible = !this.visible
  }
}
