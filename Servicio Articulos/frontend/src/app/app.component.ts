import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZapatoComponent} from './components/zapato/zapato.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZapatoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
