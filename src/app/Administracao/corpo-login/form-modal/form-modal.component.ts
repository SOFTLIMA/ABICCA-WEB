import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SalvarFotoService } from '../../../../services/salvar.foto.service';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    CommonModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {

  selectedFile!: File;
  link_img: string = '';
  isSubmitting: boolean = false;  // Variável para controlar o estado do botão de envio

  newItem = {
    id: "",
    data: "",
    descricao: "",
    link_Imgs: "",
    titulo: ""
  };

  imageOption: 'link' | 'upload' = 'link';

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salvarFotoService: SalvarFotoService
  ) {
    if (data) {
      this.newItem = { ...data, link_Imgs: data.link_Imgs.join(';') }; // Converte o array de volta para string
    }
  }

  onSubmit() {
    this.isSubmitting = true;  // Desabilita o botão de envio ao começar a requisição

    if (this.imageOption === 'upload' && this.selectedFile) {
      // Se for upload, chama o serviço para enviar a imagem
      this.salvarFotoService.uploadImagem(this.selectedFile).subscribe({
        next: (response) => {
          var temp = response.file_path;
          if (window.location.hostname === 'localhost') {
            var list = temp.split('\\');
          }
          else var list = temp.split('/');
          this.link_img = list.length > 1 ? list[list.length - 1] : temp ;  // Recebe o caminho da imagem
          console.log('Imagem enviada com sucesso:', response.file_path);
          this.newItem.link_Imgs = this.link_img;  // Atualiza o link da imagem no item

          // Envia os dados e fecha o modal
          this.dialogRef.close(this.newItem);
        },
        error: (error) => {
          console.error('Erro ao enviar a imagem:', error);
          this.isSubmitting = false;  // Reabilita o botão em caso de erro
        }
      });
    } else {
      // Se não for upload, apenas envia os dados e fecha o modal
      this.dialogRef.close(this.newItem);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];  // Armazena o arquivo selecionado
    }
  }

}
