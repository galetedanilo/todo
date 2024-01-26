import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  signal,
} from '@angular/core';
import { TodoFormHelper } from '../../helpers';
import { ReactiveFormsModule } from '@angular/forms';

import { CTodoStatus } from '../../consts';

import { ITodoSubmit } from '../../interfaces';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent extends TodoFormHelper {
  @Input({ required: true, alias: 'selected' }) set _selected(
    selected: ITodoSubmit | null
  ) {
    this.selected.set(selected);
  }
  @Input({ required: true, alias: 'loading' }) set _loading(loading: boolean) {
    this.loading.set(loading);
  }

  @Output() formSubmit = new EventEmitter<ITodoSubmit>();
  @Output() cancel = new EventEmitter<void>();

  protected status = signal(CTodoStatus);
  protected loading = signal(false);
  protected selected = signal<ITodoSubmit | null>(null);

  constructor() {
    super();

    effect(() => {
      if (this.loading()) {
        this.form.disable();
      } else {
        this.form.enable();
      }

      const _selected = this.selected();

      if (_selected)
        this.form.setValue({
          ..._selected,
          id: _selected.id.toString(),
        });
      else this.form.reset();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.getRawValue() as ITodoSubmit);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
