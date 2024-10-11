import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SobreComponent } from './sobre/sobre.component';
import { AssociadosComponent } from './associados/associados.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent, SobreComponent, AssociadosComponent, GaleriaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A.B.I.C.C.A';

  images = [
    {
      imageSrc:
        '../../public/Galeria/ABICCA.jpg',
      imageAlt: 'A.B.I.C.C.A',
    },
    {
      imageSrc:
        '../../public/Galeria/EXEMPLO.png',
      imageAlt: 'EXEMPLO',
    },
    {
      imageSrc:
        '../../public/Galeria/CORRENTES.png',
      imageAlt: 'CORRENTES',
    },
    {
      imageSrc:
        '../../public/Galeria/METALURGICA.png',
      imageAlt: 'METALURGICA',
    },
  ];

}
