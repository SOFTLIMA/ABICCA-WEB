import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MENUNAVComponent } from './menu-nav/menu-nav.component';
import { ASSOCIADOSComponent } from './associados/associados.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MENUNAVComponent, ASSOCIADOSComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A.B.I.C.C.A';
}
