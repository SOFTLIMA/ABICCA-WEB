import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../../services/email.service';

@Component({
  selector: 'app-entre-em-contato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entre-em-contato.component.html',
  styleUrl: './entre-em-contato.component.css'
})
export class EntreEmContatoComponent {

  contatoForm: FormGroup;

  constructor(private fb: FormBuilder,private emailService: EmailService) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      const formData = this.contatoForm.value;

      let emailData = {
        subject: `${formData.nome} entrou em contato`,
        message: `Nome: ${formData.nome}\n`+
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.telefone}\n` +
        `Mensagem: ${formData.mensagem}`,
        mail: formData.email
      };

      console.log(emailData);


      this.emailService.enviarEmail(emailData).subscribe(
        (response) => {
          this.contatoForm.reset();
          alert('Solicitação de contato bem-sucedida!');
        },
        (error) => {
          console.error('Erro ao enviar e-mail', error);
          alert('Ocorreu um erro durante a tentativa! Por favor utlize outro meio de contato.');
        }
      );
    }
  }

}
