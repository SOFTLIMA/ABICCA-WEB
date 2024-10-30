import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-noticia',
  standalone: true,
  imports: [],
  templateUrl: './popup-noticia.component.html',
  styleUrl: './popup-noticia.component.css'    
})

export class PopupNoticiaComponent {

  data : any;

  constructor(
    public dialogRef: MatDialogRef<PopupNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public item: any // Recebe os dados do item
  ) {
    if (item) {
      this.data = item;
      // this.data.descricao = item.descricao.replace(/\n\n/g, "<br>")
      
    }
  }

}
