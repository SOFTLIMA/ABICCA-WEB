import { CampoPainel } from './../../../Model/PainelADM';
import { DynamoDBService } from './../../../aws/DynamoDBService';
import { LoginService } from './../../../Login.Service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MenuNavComponent } from '../../Components/menu-nav/menu-nav.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from './form-modal/form-modal.component';
import { PopupComponent } from '../../Components/popup/popup.component';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MenuNavComponent, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, FormsModule, NgIf, MatIconModule],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})

export class CorpoLoginComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort | undefined;

  DATA : CampoPainel[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'data', 'descricao', 'link_Imgs', 'actions'];

  dataSource = new MatTableDataSource<CampoPainel>([]);

  newItem = {
    id: "",
    data: "",
    descricao: "",
    link_Imgs: "",
    titulo: ""
  };

  isFormVisible: boolean = false; // Controla a visibilidade do formulário

  constructor(private loginService : LoginService, private ddb : DynamoDBService, public dialog: MatDialog){}



  async ngOnInit(): Promise<void> {
    this.loginService.changeValue(true);

    this.ddb.getAllItens().then(result => {
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

        this.dataSource.data = this.DATA;

        // Iniciar a ordenação pelo ID
      this.dataSource.sort = this.sort!;  // Certifique-se de que o MatSort está configurado
      this.dataSource.sort.active = 'id'; // Defina a coluna inicial para ordenar
      this.dataSource.sort.direction = 'asc'; // Defina a direção inicial (ascendente ou descendente)
      this.dataSource.sort.sortChange.emit(); // Emitir a mudança para que a tabela atualize

      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort!;
  }

  openFormModal(item?: CampoPainel) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '600px',  // Define a largura
      height: '100%',
      data: item, // Envia os dados do item se for edição
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Verifica se estamos editando ou criando um novo item
        if (item) {
          this.onEdit(result); // Chama a função de atualizar
        } else {
          this.onCreate(result); // Chama a função de criar
        }
      }
    });
  }

  resetForm() {
    this.newItem = {
      id: "",
      data: "",
      descricao: "",
      link_Imgs: "",
      titulo: ""
    };
  }

  onCreate(item: any) {
    // Lógica para criar um novo item
    let temp : CampoPainel = {
      id: item.id == '' ? "" : item.id,
      data: item.data == '' ? "" : item.data,
      descricao: item.descricao == '' ? "" : item.descricao,
      link_Imgs: item.link_Imgs.length > 0 ? item.link_Imgs.split(';') : [],
      titulo: item.titulo == '' ? "" : item.titulo
    };


    temp.id = (this.DATA.length + 1).toString();
    this.ddb.createItem(temp).then(() => {
      this.DATA.push(temp);
      this.dataSource.data = [...this.DATA];
    }).catch(error => {
      console.error("Erro ao criar item:", error);
    });
  }

  onEdit(item: any) {
    // Lógica para atualizar um item existente
    let tempList = item.link_Imgs.split(';');

    // let tempList = this.newItem.link_Imgs.split(';');
    // let temp = { ...this.newItem, link_Imgs: tempList, id: (this.DATA.length + 1).toString() };
    let temp = { ...item, link_Imgs: tempList };

    this.ddb.updateItem(temp).then(() => {
      const index = this.DATA.findIndex(i => i.id === temp.id);
      if (index > -1) {
        this.DATA[index] = temp; // Atualiza o item na lista
      }
      this.dataSource.data = [...this.DATA];
    }).catch(error => {
      console.error("Erro ao atualizar item:", error);
    });
  }

  onDelete(element: CampoPainel) {
    // lógica para excluir o item
    console.log('Excluindo item:', element);

    const dialogRefPopUp = this.dialog.open(PopupComponent, {
      width: '350px',  // Define a largura
      height: '175px',
      data: `Deseja realmente deletar o item ${element.id}?`, // Envia os dados do item se for edição
    });

    dialogRefPopUp.afterClosed().subscribe(result => {
      if (result) {
        console.log("deletar");
        this.ddb.deleteItem(element).then(() => {
          const index = this.DATA.findIndex(i => i.id === element.id);
          if (index > -1) {
          // Remover da tabela
          this.DATA.splice(index, 1); // Remove o item da lista DATA
          this.dataSource.data = [...this.DATA]; // Atualiza a dataSource para refletir a mudança na tabela
        }
          this.dataSource.data = [...this.DATA];
        }).catch(error => {
          console.error("Erro ao atualizar item:", error);
        });
      } else {
        console.log("não deletar");
      }
    });


  }

}


