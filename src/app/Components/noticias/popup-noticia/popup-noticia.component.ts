import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-noticia.component.html',
  styleUrl: './popup-noticia.component.css'
})

export class PopupNoticiaComponent implements AfterViewInit{

  data : any;

  @ViewChild('descricaoRef', { static: false }) descricaoRef!: ElementRef;
  isScrollable: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PopupNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public item: any // Recebe os dados do item
  ) {
    if (item) {
      this.data = item;
      // this.data.descricao = item.descricao.replace(/\n\n/g, "<br>")

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

}
