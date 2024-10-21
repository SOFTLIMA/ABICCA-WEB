import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from "./Components/menu-nav/menu-nav.component";
import { RodapeComponent } from "./Components/rodape/rodape.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A.B.I.C.C.A';
}
