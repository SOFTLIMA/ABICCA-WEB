import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SobreComponent } from './sobre/sobre.component';
import { AssociadosComponent } from './associados/associados.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImagensComponent } from './imagens/imagens.component';
import { RodapeComponent } from './rodape/rodape.component';
import { AnimacaoRodapeComponent } from './animacao-rodape/animacao-rodape.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent, SobreComponent, AssociadosComponent, GaleriaComponent, ImagensComponent,RodapeComponent, AnimacaoRodapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A.B.I.C.C.A';

  images = [
    {
      imageSrc:
        'Galeria/ABICCA.jpg',
      imageAlt: 'A.B.I.C.C.A',
    },
    {
      imageSrc:
        'Galeria/EXEMPLO.png',
      imageAlt: 'EXEMPLO',
    },
    {
      imageSrc:
        'Galeria/CORRENTES.png',
      imageAlt: 'CORRENTES',
    },
    {
      imageSrc:
        'Galeria/METALURGICA.png',
      imageAlt: 'METALURGICA',
    },
  ];

}
