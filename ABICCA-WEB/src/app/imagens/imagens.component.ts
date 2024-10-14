import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-imagens',
  standalone: true,
  templateUrl: './imagens.component.html',
  styleUrls: ['./imagens.component.css']
})
export class ImagensComponent implements AfterViewInit {
  currentIndex: number = 0; // Índice da imagem ativa
  imagens: HTMLImageElement[] = []; // Array para armazenar as imagens
  autoAdvanceInterval: any; // Intervalo para autoavançar imagens

  ngAfterViewInit() {
    const imagensContainer = document.getElementById('imagens') as HTMLElement;
    this.imagens = Array.from(imagensContainer.getElementsByTagName('img'));

    // Mostra a primeira imagem como ativa
    this.updateImagePosition();

    // Adiciona eventos de clique nos botões
    document.getElementById('btnEsquerda')?.addEventListener('click', () => this.prevImage());
    document.getElementById('btnDireita')?.addEventListener('click', () => this.nextImage());

    // Inicia autoavançar
    this.startAutoAdvance();
  }

  updateImagePosition() {
    this.imagens.forEach((img, index) => {
      img.style.display = index === this.currentIndex ? 'block' : 'none'; // Mostra ou oculta as imagens
    });
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imagens.length; // Avança para a próxima imagem
    this.updateImagePosition();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.imagens.length) % this.imagens.length; // Volta para a imagem anterior
    this.updateImagePosition();
  }

  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => {
      this.nextImage();
    }, 10000); // Troca de imagem a cada 10 segundos
  }

  ngOnDestroy() {
    clearInterval(this.autoAdvanceInterval); // Limpa o intervalo ao destruir o componente
  }
 }