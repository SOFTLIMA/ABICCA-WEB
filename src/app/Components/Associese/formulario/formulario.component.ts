import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EmailService } from "../../../../services/email.service"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

@Component({
  selector: "app-formulario",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./formulario.component.html",
  styleUrl: "./formulario.component.css",
})
export class FormularioComponent {
  contatoForm: FormGroup
  enviando = false
  sucesso = false
  erro = false

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
  ) {
    this.contatoForm = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", Validators.required],
      mensagem: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      this.enviando = true
      this.sucesso = false
      this.erro = false

      const formData = this.contatoForm.value

      const emailData = {
        subject: `${formData.nome} deseja se associar`,
        message:
          `Nome: ${formData.nome}\n` +
          `Email: ${formData.email}\n` +
          `Telefone: ${formData.telefone}\n` +
          `Mensagem: ${formData.mensagem}`,
        mail: formData.email,
      }

      console.log(emailData)

      this.emailService.enviarEmail(emailData).subscribe(
        (response) => {
          this.enviando = false
          this.sucesso = true
          this.contatoForm.reset()
          setTimeout(() => {
            this.sucesso = false
          }, 5000)
        },
        (error) => {
          this.enviando = false
          this.erro = true
          console.error("Erro ao enviar e-mail", error)
        },
      )
    } else {
      // Marca todos os campos como tocados para mostrar validação
      Object.keys(this.contatoForm.controls).forEach((key) => {
        const control = this.contatoForm.get(key)
        control?.markAsTouched()
      })
    }
  }

  // Métodos auxiliares para validação
  isCampoInvalido(campo: string): boolean {
    const control = this.contatoForm.get(campo)
    return control ? control.invalid && (control.dirty || control.touched) : false
  }
}
