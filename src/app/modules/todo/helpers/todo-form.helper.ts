import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITodoForm } from '../interfaces';

export class TodoFormHelper {
  private readonly fb = inject(FormBuilder);

  protected form!: FormGroup<ITodoForm>;

  constructor() {
    this.form = this.fb.group<ITodoForm>({
      id: new FormControl(''),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      status: new FormControl('OPEN', Validators.required),
    });
  }
}
