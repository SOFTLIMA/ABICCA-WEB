import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../../services/email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent{

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
        subject: `${formData.nome} deseja se associar`,
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
