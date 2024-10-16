import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { SobreComponent } from './sobre/sobre.component';
import { AssociadosComponent } from './associados/associados.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagensComponent } from './imagens/imagens.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { RodapeComponent } from './rodape/rodape.component';
import { AnimacaoRodapeComponent } from './animacao-rodape/animacao-rodape.component';
import { NavioComponent } from './navio/navio.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent, SobreComponent, AssociadosComponent, GaleriaComponent, ImagensComponent,RodapeComponent, AnimacaoRodapeComponent, NoticiasComponent, NavioComponent],
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
