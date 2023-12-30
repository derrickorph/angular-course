import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';
import { inject } from '@angular/core';
import { AuthenticationGateway } from './core/ports/authentication.gateway';
import { IdentityGateway } from './core/ports/identity.gateway';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/layouts/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'reservation',
        loadComponent: () =>
          import('./views/reservation/reservation.component').then(
            (m) => m.ReservationComponent
          ),
      },
      {
        path: 'user',
        canMatch: [() => inject(IdentityGateway).isAdmin()],

        loadComponent: () =>
          import('./views/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: 'drink-tracker',
        loadComponent: () =>
          import('./views/drink-tracker/drink-tracker.component').then(
            (m) => m.DrinkTrackerComponent
          ),
      },
      {
        path: 'check-list',
        loadComponent: () =>
          import('./views/check-list/check-list.component').then(
            (m) => m.CheckListComponent
          ),
      },
      
      {
        path: 'for-directive',
        canMatch: [() => inject(AuthenticationGateway).isAuthenticated],

        loadComponent: () =>
          import('./views/for-directive/for-directive.component').then(
            (m) => m.ForDirectiveComponent
          ),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
