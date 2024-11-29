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
import { FormUserComponent } from './users/form-user/form-user.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { FormProductsComponent } from './products/form-products/form-products.component';
import { ManageProductsComponent } from './products/manage-products/manage-products.component';
import { WishlistComponent } from './shared/pages/wishlist/wishlist.component';

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
      { path: 'wishlist', component: WishlistComponent },
      { path: '**', redirectTo: 'landing' },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'admin',
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: 'addUser',
        component: FormUserComponent,
      },
      {
        path: 'manageUsers',
        component: ManageUsersComponent,
      },
      {
        path: 'editUser',
        component: FormUserComponent,
      },
    ],
  },
  {
    path: 'products',
    children: [
      {
        path: 'addProduct',
        component: FormProductsComponent,
      },
      {
        path: 'manageProducts',
        component: ManageProductsComponent,
      },
      {
        path: 'editProduct',
        component: FormProductsComponent,
      },
    ],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
