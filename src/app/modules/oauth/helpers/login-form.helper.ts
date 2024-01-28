import { inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILoginForm } from '../interfaces';

export class LoginFormHelper {
  private readonly fb = inject(FormBuilder);

  protected form!: FormGroup<ILoginForm>;

  constructor() {
    this.form = this.fb.group<ILoginForm>({
      username: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }
}
