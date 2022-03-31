import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';
import { RecipesPageComponent } from './components/recipes-page/recipes-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  { path: "ingredients" , component: IngredientsPageComponent },
  { path: "recipes" , component: RecipesPageComponent },
  { path: "users" , component: UsersPageComponent },
  { path: "settings" , component: SettingsPageComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
