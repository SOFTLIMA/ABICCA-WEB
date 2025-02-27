import { Component, OnInit } from '@angular/core';
import { BlogComponent } from "./blog/blog.component";
import { CampoPainel } from '../../../Model/PainelADM';
import { DynamoDBService } from '../../../aws/DynamoDBService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface pagination {
  pag: number;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [BlogComponent, CommonModule, ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit{
DATA : CampoPainel[] = [];
listPagnation : pagination[] = [];
constructor( private ddb : DynamoDBService){}


  async ngOnInit(): Promise<void> {
    await this.ddb.readAllItens().subscribe(result => {
      if (result) {
        this.DATA = result.map(item => ({
          id: item['id'],
          titulo: item['titulo'],
          data: item['data'],
          descricao: item['descricao'],
          link_Imgs: item['link_Imgs'],
        }));

        this.DATA.sort((a, b) => this.convertToDate(b.data).getTime() - this.convertToDate(a.data).getTime());

        if (this.DATA.length > 0) {
          let paginas: number = Math.ceil(this.DATA.length / 6);
          for (let i = 0; i <= paginas; i++) {
            if (i > 1) {
              this.listPagnation.push({ pag: i });
            }
          }
        }
      }
    });
  }


showItens(): boolean{
  if (this.DATA.length > 0) {
    return true;
  }
  return false;
}

  // Método para converter data no formato DD/MM/YYYY para um objeto Date
private convertToDate(dateString: string): Date {
  const parts = dateString.split('/');
  // Verifique se o formato está correto
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês começa do zero
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(); // Retorna uma data padrão se o formato estiver errado
}


}
