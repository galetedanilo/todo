import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoResponse } from '../../responses';
import { TTodoStatus } from '../../types';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() todo_type: TTodoStatus = 'OPEN';
  @Input() todo!: ITodoResponse;

  @Output() viewEmitter = new EventEmitter<void>();
  @Output() removeEmitter = new EventEmitter<void>();
}
