import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login/login.page';
import { RegisterPage } from './pages/register/register/register.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../app/pages/register/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../app/pages/forgot-password/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
