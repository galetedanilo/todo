import { Component, inject, signal } from '@angular/core';
import { SlidePanelComponent, TodoCardComponent } from '../../ui';
import { TodosStore } from '../../stores/todos.store';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { ITodoSubmit } from '../../interfaces';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, TodoFormComponent],
  providers: [TodosStore],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  readonly store = inject(TodosStore);

  onSubmit(todo: ITodoSubmit) {
    if (todo.id) {
      this.store.updateTodo({ params: todo, id: todo.id });
    } else {
      this.store.createTodo(todo);
    }
  }
}
