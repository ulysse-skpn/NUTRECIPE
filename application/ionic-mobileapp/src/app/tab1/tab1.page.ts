import { Component, OnInit } from '@angular/core';
import { ToastController , ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal/modal.component';
import { RecipesService } from '../services/recipes/recipes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['./../../global.scss']
})
export class Tab1Page implements OnInit {

  connected:boolean = false
  searchTerm:string = ""
  recipeArraySize!:number
  recipeList = []
  selectTab:string = "card"
  pageIndex:number = 0
  pageSize:number = 30

  constructor(
    private recipeService:RecipesService,
    private toastController:ToastController,
    private modalController:ModalController
  ) {}

  ngOnInit(): void 
  {
    if( sessionStorage.getItem("access_token")) this.connected = true
    
    this.recipeService.getSizeArrayRecipes().subscribe( async(res) => {
      this.recipeArraySize = res.nbElem
    })

    this.loadRecipes()
  }

  loadRecipes( pIndex:number = this.pageIndex , pSize:number = this.pageSize )
  {
    this.recipeService.getAllRecipesPagination( pIndex, pSize ).subscribe( async(res) => {
      res.forEach(element => {
        element['expanded'] = false
        this.recipeList.push(element)
      });
    })
  }

  async detail( event:Event , id:number )
  {
    event.stopPropagation()

    this.recipeService.getRecipeById(id).subscribe( async(res) => {
      
      const modal = await this.modalController.create({
        component:ModalComponent,
        swipeToClose:true,
        componentProps: { 
          type:'recipe-details' , 
          title:res.title,
          prep:res.prep_time,
          cook:res.cooking_time,
          rest:res.rest_time,
          categories:res.categories,
          ingredients_list:res.ingredients_list,
          instructions:res.instructions,
          serving_size:res.serving_size,
          image:res.image,
        },
        animated: true,
        backdropDismiss:true
      })
  
      return await modal.present()
    })
    
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

  loadData(event:any)
  {
      this.pageIndex = this.pageIndex + 1
      
      this.loadRecipes( this.pageIndex , this.pageSize )

      event.target.complete()

      if( this.recipeList.length === this.recipeArraySize ) event.target.disabled = true
  }

  expand(recipe)
  {
    recipe.expanded = !recipe.expanded
  }
}
