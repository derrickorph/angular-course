import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/layouts/app-layout/app-layout.component').then(
        (component) => component.AppLayoutComponent
    ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then((component) => component.HomeComponent),
      },
      {
        path: 'reservation',
        loadComponent: () =>
          import('./views/reservation/reservation.component').then((component) => component.ReservationComponent),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./views/user/user.component').then((component) => component.UserComponent),
      },
      {
        path: 'drink-tracker',
        loadComponent: () =>
          import('./views/drink-tracker/drink-tracker.component').then((component) => component.DrinkTrackerComponent),
      },
    ],
  },
];
