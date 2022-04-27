import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BookmarksService } from '../services/bookmarks/bookmarks.service';
import { IngredientsService } from '../services/ingredients/ingredients.service';
import { RecipesService } from '../services/recipes/recipes.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['./../../global.scss']
})
export class Tab3Page implements OnInit {

  connected:boolean = false
  selectTab:string = "all"
  searchTerm:string = ""
  recipeArraySize!:number
  recipeList = []
  ingredientArraySize!:number
  ingredientList = []
  pageIndex:number = 0
  pageSize:number = 30


  constructor(
    private bookmarkService:BookmarksService,
    private recipeService:RecipesService,
    private ingredientService:IngredientsService,
    private toastController:ToastController,
    private modalController:ModalController
  ) {}

  ngOnInit(): void 
  {
    if( sessionStorage.getItem("access_token")) this.connected = true
    //?
  }
}
