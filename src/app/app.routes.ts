import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/layout/default/default.component';
import { MasterComponent } from './shared/layout/master/master.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'common',
        loadChildren: () =>
          import('./modules/oauth/oauth.routes').then((r) => r.oauth_routes),
      },
    ],
  },
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'todo',
        loadChildren: () =>
          import('./modules/todo/todo.routes').then((r) => r.todo_routes),
      },
    ],
  },
];
