import { Routes } from '@angular/router';
import { TodoService } from './services/todo.service';

export const todo_routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  {
    path: 'todos',
    providers: [TodoService],
    loadComponent: () =>
      import('./pages/todos/todos.component').then((c) => c.TodosComponent),
  },
];
