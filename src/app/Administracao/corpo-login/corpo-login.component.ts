import { CampoPainel } from './../../../Model/PainelADM';
import { DynamoDBService } from './../../../aws/DynamoDBService';
import { LoginService } from './../../../Login.Service';
import { Component, OnInit} from '@angular/core';
import { MenuNavComponent } from '../../Components/menu-nav/menu-nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MenuNavComponent, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})

export class CorpoLoginComponent implements OnInit{

  DATA : CampoPainel[] = [];

  displayedColumns: string[] = ['ABICCA_id', 'titulo', 'data', 'descricao', 'link_Imgs'];
  dataSource: CampoPainel[] = [];

  newItem : CampoPainel = {
    ABICCA_id: "1",
    data: "23/10/2024",
    descricao: "Descrição do item.",
    link_Imgs: ["Galeria/Noticias/imagem1.jpg", "1"],
    titulo: "ABICCA e a ABNT formalizaram assinatura de acordo de cooperação para suporte à Secretaria da ABNT/ CEE-113."
  };

  constructor(private loginService : LoginService, private ddb : DynamoDBService){}

  // image : string | unknown = "";

  async ngOnInit(): Promise<void> {
    this.loginService.changeValue(true);
    // console.log(this.ddb.getAllItens());


    this.ddb.getAllItens().then(result => {
      if (result) {
        result.forEach(item => {
          this.DATA.push({
            ABICCA_id: item['ABICCA_id'],
            titulo: item['titulo'],
            data: item['data'],
            descricao: item['descricao'],
            link_Imgs: item['link_Imgs'],
          });

        });

        this.dataSource = this.DATA;

      }
    });




    // this.ddb.getItem("1").then(result => {
    //   if (result) {
    //     this.DATA.push({
    //       ABICCA_id: result['ABICCA_id'],
    //       titulo: result['titulo'],
    //       data: result['data'],
    //       descricao: result['descricao'],
    //       link_Imgs: result['link_Imgs'],
    //     });
    //     this.dataSource = this.DATA;
    //   }
    // });

    // this.ddb.createItem(this.newItem);
  }
}


