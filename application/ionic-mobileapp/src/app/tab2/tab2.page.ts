import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal/modal.component';
import { IngredientsService } from '../services/ingredients/ingredients.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['./../../global.scss']
})
export class Tab2Page implements OnInit {

  connected:boolean = false
  searchTerm:string = ""
  ingredientArraySize!:number
  ingredientList = []
  selectTab:string = "card"
  pageIndex:number = 0
  pageSize:number = 5

  constructor(
    private ingredientService:IngredientsService,
    private toastController:ToastController,
    private modalController:ModalController
  ) {}

  ngOnInit(): void 
  {
    if( sessionStorage.getItem("access_token")) this.connected = true
    
    this.ingredientService.getSizeArrayIngredients().subscribe( async(res) => {
      this.ingredientArraySize = res.nbElem
    })

    this.loadIngredients()
  }

  loadIngredients( pIndex:number = this.pageIndex , pSize:number = this.pageSize )
  {
    this.ingredientService.getAllIngredients( pIndex, pSize ).subscribe( async(res) => {
      console.log(res);
      
      res.forEach(element => {
        element['expanded'] = false
        this.ingredientList.push(element)
      });
    })
  }

  async detail( event:Event , id:number )
  {
    event.stopPropagation()

    this.ingredientService.getIngredientById(id).subscribe( async(res) => {
      
      const modal = await this.modalController.create({
        component:ModalComponent,
        swipeToClose:true,
        componentProps: { 
          type:'ingredient-details' , 
          product_name:res.product_name,
          ingredient_text:res.ingredient_text,
          carbohydrates:res.carbohydrates,
          proteins:res.proteins,
          fats:res.fats,
          salt:res.salt,
          calories:res.calories,
          nova_group:res.nova_group,
          categories:res.categories,
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

      // this.ingredientService. //?
    }
    else 
    {
      message = "Retrait des favoris"

      // this.ingredientService. //?
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
      
      this.loadIngredients( this.pageIndex , this.pageSize )

      event.target.complete()

      if( this.ingredientList.length === this.ingredientArraySize ) event.target.disabled = true
  }

  expand(ingredient)
  {
    ingredient.expanded = !ingredient.expanded
  }
}
