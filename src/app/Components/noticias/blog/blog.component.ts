import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CampoPainel } from '../../../../Model/PainelADM';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  pageSize: number = 4; // Itens por página
  currentPage: number = 0; // Página atual


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
}
