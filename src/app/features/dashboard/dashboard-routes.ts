import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then((m) => m.DashboardComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/dashboard-home.component').then(
            (m) => m.DashboardHomeComponent
          ),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./components/message/message.component').then((m) => m.MessageComponent),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./components/appointments/appointment.component').then(
            (m) => m.AppointmentPageComponent
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/user-profile.component').then((m) => m.UserProfileComponent),
      },
      // Default child route
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
