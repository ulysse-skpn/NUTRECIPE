import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id:number;
  infos:any;

  constructor
  (
    private modalCtrl: ModalController,
    private articleService: ArticlesService
  ) 
  { 
    // this.getRecipe().then(res => {
    //   this.infos = res;
    // })
  }

  // idrecipes:number;
  // title:string;
  // prep:string;
  // cookingTime:string;
  // rest:string;
  // categories:string;
  // ingredients:string;
  // serving_size:string;
  // instructions:string;
  // recipe_image:number;
  // image_path:string;
  // category:string;
  ngOnInit() 
  {
    // this.getRecipe()
    this.articleService.getRecipe(this.id).subscribe(res => {
      let element = res[0][0];
      let details = document.getElementById("details");
      details.innerHTML = 
      `
      <h4>${element.title} &nbsp; temps : ${element.cookingTime}</h4>
      <h6>Categories :${element.categories}</h6>
      <img src=${element.image_path} style="width:100%;margin:0.5rem">
      <label>Ingredients</label>
      <p>${element.ingredients.replace( /\.(?=[A-Z])/g, '<br /><br />')}</p>
      <label>Instructions</label>
      <p>${element.instructions.replace( /\.(?=[A-Z])/g, '<br /><br />')}</p>
      `;
    });
  }

  async getRecipe()
  {
    await this.articleService.getRecipe(this.id).subscribe(res => {
      return res;
    });
  }


  async dismissModal()
  {
    await this.modalCtrl.dismiss();
  }
}
