import { CampoPainel } from './../../../Model/PainelADM';
import { DynamoDBService } from './../../../aws/DynamoDBService';
import { LoginService } from './../../../Login.Service';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from './form-modal/form-modal.component';
import { PopupComponent } from '../../Components/popup/popup.component';
import { NoticiaService } from '../../../services/noticiaService';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})
export class CorpoLoginComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;

  DATA: CampoPainel[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'data', 'descricao', 'link_Imgs', 'actions'];
  dataSource = new MatTableDataSource<CampoPainel>([]);
  newItem = { id: "", data: "", descricao: "", link_Imgs: "", titulo: "" };
  isFormVisible: boolean = false;

  constructor(
    private loginService: LoginService,
    private noticiaService: NoticiaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginService.changeValue(true);
    this.noticiaService.readAllItens().subscribe(result => {
      this.DATA = result.map(item => ({
        id: item.id,
        titulo: item.titulo,
        data: item.data,
        descricao: item.descricao,
        link_Imgs: item.link_Imgs,
      }));
      this.dataSource.data = this.DATA;
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'id';
        this.dataSource.sort.direction = 'asc';
        this.dataSource.sort.sortChange.emit();
      }
    });
  }

  ngAfterViewInit() {
    if (this.sort) this.dataSource.sort = this.sort;
  }

  openFormModal(item?: CampoPainel) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '600px',
      height: '100%',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item ? this.onEdit(result) : this.onCreate(result);
      }
    });
  }

  resetForm() {
    this.newItem = { id: "", data: "", descricao: "", link_Imgs: "", titulo: "" };
  }

  onCreate(item: any) {
    const temp: CampoPainel = {
      id: (this.DATA.length + 1).toString(),
      data: item.data,
      descricao: item.descricao,
      link_Imgs: item.link_Imgs ? item.link_Imgs.split(';') : [],
      titulo: item.titulo
    };

    this.noticiaService.createItem(temp).subscribe(() => {
      this.DATA.push(temp);
      this.dataSource.data = [...this.DATA];
    }, error => {
      console.error("Erro ao criar item:", error);
    });
  }

  onEdit(item: any) {
    const temp = {
      ...item,
      link_Imgs: item.link_Imgs.split(';')
    };

    this.noticiaService.updateItem(temp).subscribe(() => {
      const index = this.DATA.findIndex(i => i.id === temp.id);
      if (index > -1) this.DATA[index] = temp;
      this.dataSource.data = [...this.DATA];
    }, error => {
      console.error("Erro ao atualizar item:", error);
    });
  }

  onDelete(element: CampoPainel) {
    const dialogRefPopUp = this.dialog.open(PopupComponent, {
      width: '350px',
      height: '175px',
      data: `Deseja realmente deletar o item ${element.id}?`,
    });

    dialogRefPopUp.afterClosed().subscribe(result => {
      if (result) {
        this.noticiaService.deleteItem(element).subscribe(() => {
          const index = this.DATA.findIndex(i => i.id === element.id);
          if (index > -1) this.DATA.splice(index, 1);
          this.dataSource.data = [...this.DATA];
        }, error => {
          console.error("Erro ao deletar item:", error);
        });
      }
    });
  }
}
