import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MENUNAVComponent } from './menu-nav/menu-nav.component';
import { SOBREComponent } from './sobre/sobre.component';
import { ASSOCIADOSComponent } from './associados/associados.component';
import { ImagensComponent } from './imagens/imagens.component';
import { RodapeComponent } from './rodape/rodape.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImagensComponent, MENUNAVComponent, SOBREComponent, ASSOCIADOSComponent, RodapeComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A.B.I.C.C.A';
}
