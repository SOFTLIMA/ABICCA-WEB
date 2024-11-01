import { Component } from '@angular/core';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  descricao: string = ' A ABICCA e a ABNT selaram um acordo histórico que promete revolucionar a normalização de cabos de aço e acessórios no Brasil. Marcos Antonio Piccoli, presidente da ABICCA, e líderes da ABNT uniram forças com um objetivo claro: elevar os padrões de qualidade e segurança na indústria. Este compromisso não só reforça a competitividade do setor, mas também traz benefícios diretos para consumidores e toda a cadeia produtiva. O que mais essa parceria pode trazer para o futuro da indústria brasileira?';
}
