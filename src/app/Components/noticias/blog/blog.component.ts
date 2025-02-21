import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CampoPainel } from '../../../../Model/PainelADM';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PopupNoticiaComponent } from '../popup-noticia/popup-noticia.component';

interface pagination {
  pag: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatPaginator],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{


  @Input() DATA : CampoPainel[] = [];
  @Input() listPagnation : pagination[] = [];

  paginatedData: CampoPainel[] = [];
  pageSize: number = 6; // Itens por página
  currentPage: number = 0; // Página atual

  constructor(public dialog: MatDialog){}


  ngOnInit(): void {
    this.updatePaginatedData();
  }


  updatePaginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.DATA.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }
  onClick(item: CampoPainel) {
    const dialogRef = this.dialog.open(PopupNoticiaComponent, {
      minWidth: '1300px',
      maxHeight: '700px',
      height: '700px',
      width: '1300px',
      panelClass: 'popup-noticia',
      data: item, // Envia os dados do item se for edição
    });
  }
}
