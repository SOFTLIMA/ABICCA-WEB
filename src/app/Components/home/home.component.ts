import { Component } from '@angular/core';
import { ImagensComponent } from "../imagens/imagens.component";
import { NoticiaComponent } from "../noticia/noticia.component";
import { NavioComponent } from "../navio/navio.component";
import { SobreComponent } from "../sobre/sobre.component";
import { AssociadosComponent } from "../associados/associados.component";
import { GaleriaComponent } from "../galeria/galeria.component";
import { AnimacaoRodapeComponent } from "../animacao-rodape/animacao-rodape.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImagensComponent, NoticiaComponent, NavioComponent, SobreComponent, AssociadosComponent, GaleriaComponent, AnimacaoRodapeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
