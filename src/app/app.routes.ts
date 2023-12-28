import { ReservationComponent } from './reservation/reservation.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/app-layout/app-layout.component').then(
        (component) => component.AppLayoutComponent
    ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((component) => component.HomeComponent),
      },
      {
        path: 'reservation',
        loadComponent: () =>
          import('./reservation/reservation.component').then((component) => component.ReservationComponent),
      },
    ],
  },
];
