import { Component, EventEmitter, Output } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILoginRequest } from '../../requests';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<ILoginRequest>();
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
    } else {
      this.form.markAllAsTouched();
    }
  }
}
