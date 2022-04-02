import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { UsersPageComponent } from './components/usersPage/users-page/users-page.component';
import { RecipesPageComponent } from './components/recipesPage/recipes-page/recipes-page.component';
import { IngredientsPageComponent } from './components/ingredientsPage/ingredients-page/ingredients-page.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes:Routes = 
[
  { path: "" , component : RootComponent },
  { path: "register" , component : RegisterComponent},
  { path: "forgotPassword" , component : ForgotPasswordComponent},
  
  
  { path: "dashboard" , component : DashboardComponent},
  { path: "users" , component : UsersPageComponent},
  { path: "recipes" , component : RecipesPageComponent},
  { path: "ingredients" , component : IngredientsPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
