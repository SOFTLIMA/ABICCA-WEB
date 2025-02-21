import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-noticia.component.html',
  styleUrl: './popup-noticia.component.css'
})

export class PopupNoticiaComponent implements AfterViewInit{

  data : any;
  descricaoProcessada : any;

  @ViewChild('descricaoRef', { static: false }) descricaoRef!: ElementRef;
  isScrollable: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PopupNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public item: any, // Recebe os dados do item
    private sanitizer: DomSanitizer
  ) {
    if (item) {
      this.data = item;
      this.descricaoProcessada = this.sanitizer.bypassSecurityTrustHtml(this.convertLinks(this.data.descricao));

    }
  }

  ngAfterViewInit() {
    const element = this.descricaoRef.nativeElement;
    this.isScrollable = element.scrollHeight > element.clientHeight;

    // Adiciona a classe scrollable se necessário
    if (this.isScrollable) {
      element.classList.add('scrollable');
    }

    // Notifica o Angular sobre a mudança
    this.changeDetectorRef.detectChanges();

  }

  // Função para converter as URLs em links clicáveis
  convertLinks(text: string): string {
    if (!text) return text;

    // Expressão regular para encontrar URLs
    const urlRegex = /https?:\/\/[^\s]+/g;

    // Substituir URLs por tags <a>
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank">${url.substring(0,50)+'...'}</a>`;
    });
  }

}
