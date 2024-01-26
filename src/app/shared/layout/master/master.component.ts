import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent {}
