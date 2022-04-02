import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'

import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { IngredientsPageComponent } from './components/ingredientsPage/ingredients-page/ingredients-page.component';
import { RecipesPageComponent } from './components/recipesPage/recipes-page/recipes-page.component';
import { UsersPageComponent } from './components/usersPage/users-page/users-page.component';
import { SettingsPageComponent } from './components/settings/settings-page/settings-page.component'

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    DashboardComponent,
    IngredientsPageComponent,
    RecipesPageComponent,
    UsersPageComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
