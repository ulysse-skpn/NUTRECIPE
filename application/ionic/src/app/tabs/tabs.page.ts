import { Component } from '@angular/core';
import { RecipeOut } from '../interfaces/recipes/recipe-out';
import { ArticlesService } from '../services/articles/articles.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private articleService: ArticlesService,
    private storageService: Storage
  ) {}

  ngOnInit()
  {
    this.fetchArticles();
  }

  async fetchArticles()
  {
    await this.storageService.get("RECIPES").then( async(res) => {
      if( !res )
      {
        await this.articleService.getAllRecipes().subscribe( async(res) => {
        const recipes = res[0];
        await this.storageService.set("RECIPES",recipes);
      });
      }
    });
  }
}
