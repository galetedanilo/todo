import { Component, EventEmitter, Output } from '@angular/core';

import {
  ReactiveFormsModule,
} from '@angular/forms';
import { ILoginRequest } from '../../requests';
import { LoginFormHelper } from '../../helpers';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent extends LoginFormHelper {
  @Output() formSubmit = new EventEmitter<ILoginRequest>();

  constructor() {
    super();
  }

  onSubmit() {
    if (this.form.valid) {
    } else {
      this.form.markAllAsTouched();
    }
  }
}
