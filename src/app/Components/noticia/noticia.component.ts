import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CampoPainel } from '../../../Model/PainelADM';
import { DynamoDBService } from '../../../aws/DynamoDBService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  DATA : CampoPainel[] = [];

  constructor( private ddb : DynamoDBService){}

  async ngOnInit(): Promise<void> {
    await this.ddb.readAllItens().subscribe(result => {
      if (result) {
        result.forEach(item => {
          this.DATA.push({
            id: item['id'],
            titulo: item['titulo'],
            data: item['data'],
            descricao: item['descricao'],
            link_Imgs: item['link_Imgs'],
          });
        });
      // Ordenar a lista DATA pelo campo 'data' no formato DD/MM/YYYY
      this.DATA.sort((a: CampoPainel, b: CampoPainel) => {
        const dateA = this.convertToDate(a.data);
        const dateB = this.convertToDate(b.data);
        return dateB.getTime() - dateA.getTime(); // Para crescente (mais antiga para mais recente)
      });
      }
    });
  }


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
