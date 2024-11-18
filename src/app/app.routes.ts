import { Routes } from '@angular/router';
import { LayoutPageComponent } from './cars/pages/layout-page/layout-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LandingPageComponent } from './cars/pages/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: LayoutPageComponent,
        children: [
          { path: 'landing', component:LandingPageComponent },
          { path: '**', redirectTo: 'landing' },
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
