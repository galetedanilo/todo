import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './authorize.component.html',
  styleUrl: './authorize.component.scss',
})
export class AuthorizeComponent {}
