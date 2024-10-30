import { Component, OnInit } from '@angular/core';
import { BlogComponent } from "./blog/blog.component";
import { CampoPainel } from '../../../Model/PainelADM';
import { DynamoDBService } from '../../../aws/DynamoDBService';
import { CommonModule } from '@angular/common';

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
        result.forEach(item => {
          this.DATA.push({
            id: item['id'],
            titulo: item['titulo'],
            data: item['data'],
            descricao: item['descricao'],
            link_Imgs: item['link_Imgs'],
          });
        });


        if (this.DATA.length > 0) {
          let paginas : number = Math.ceil(this.DATA.length/4);

          for (let i = 0; i <= paginas; i++) {
            if (i > 1) {
              this.listPagnation.push({pag: i});
            }
          }
        };
      }
    });
  }

  showItens(): boolean{
    if (this.DATA.length > 0) {
      return true;
    }
    return false;
  }


}
