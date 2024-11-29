import { Routes } from '@angular/router';
import { LayoutPageComponent } from './cars/pages/layout-page/layout-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LandingPageComponent } from './cars/pages/landing-page/landing-page.component';
import { ProductPageComponent } from './cars/pages/product-page/product-page.component';
import { ProductListPageComponent } from './cars/pages/product-list-page/product-list-page.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { SellPageComponent } from './cars/pages/sell-page/sell-page.component';
import { MainComponent } from './admin/main/main.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ModifyPageComponent } from './cars/pages/modify-page/modify-page.component';
import { CartPageComponent } from './cars/pages/cart-page/cart-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: LayoutPageComponent,
        children: [
          { path: 'landing', component: LandingPageComponent },
          { path: 'product-list', component: ProductListPageComponent },
          { path: 'product-list/:id', component: ProductPageComponent },
          { path: 'sell', component: SellPageComponent },
          { path: 'modify-product/:id', component: ModifyPageComponent },
          { path: 'cart', component: CartPageComponent},
          { path: '**', redirectTo: 'landing' },
        ]
    },
    {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'admin',
    children: [
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
