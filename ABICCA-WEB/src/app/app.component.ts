import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MENUNAVComponent } from './menu-nav/menu-nav.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MENUNAVComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ABICCA-WEB';
}
