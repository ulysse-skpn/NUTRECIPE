import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';

const routes:Routes = 
[
  { path: "" , component : RootComponent},
  { path: "register" , component : RegisterComponent},
  { path: "forgotPassword" , component : ForgotPasswordComponent}
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
