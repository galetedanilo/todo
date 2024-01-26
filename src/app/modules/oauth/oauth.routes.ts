import { Routes } from '@angular/router';

export const oauth_routes: Routes = [
  { path: '', redirectTo: 'authorize', pathMatch: 'full' },
  {
    path: 'authorize',
    loadComponent: () =>
      import('./pages/authorize/authorize.component').then((c) => c.AuthorizeComponent),
  },
];
