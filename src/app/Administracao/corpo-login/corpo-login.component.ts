import { DynamoDBService } from './../../../aws/DynamoDBService';
import { LoginService } from './../../../Login.Service';
import { Component, NgModule, OnInit} from '@angular/core';
import { MenuNavComponent } from '../../Components/menu-nav/menu-nav.component';
import { CampoPainel } from '../../../Model/PainelADM';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MenuNavComponent],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})

export class CorpoLoginComponent implements OnInit{

  newItem : CampoPainel = {
    ABICCA_id: "1",
    data: "23/10/2024",
    descricao: "Descrição do item.",
    link_Imgs: ["Galeria/Noticias/imagem1.jpg", "1"],
    titulo: "ABICCA e a ABNT formalizaram assinatura de acordo de cooperação para suporte à Secretaria da ABNT/ CEE-113."
  };


  constructor(private loginService : LoginService, private ddb : DynamoDBService){}

  image : string | unknown = "";

  async ngOnInit(): Promise<void> {
    this.loginService.changeValue(true);
    this.ddb.getItem("1").then(result => {
      if (result) {
        console.log(result['titulo']);
        console.log(result['data']);
        this.image = Array.from(result['link_Imgs'])[0];
      }
    });

    // this.ddb.createItem(this.newItem);


  }
}
