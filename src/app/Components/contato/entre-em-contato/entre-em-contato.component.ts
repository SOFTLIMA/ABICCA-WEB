import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entre-em-contato',
  standalone: true,
  imports: [],
  templateUrl: './entre-em-contato.component.html',
  styleUrl: './entre-em-contato.component.css'
})
export class EntreEmContatoComponent implements OnInit{
  nome: string = '';
  subject: string = '';
  nextUrl: string = ''; // Variável para o valor do _next

  constructor() {}

  ngOnInit() {
    // Definindo a URL de redirecionamento dinamicamente
    this.nextUrl = this.getDynamicRedirectUrl(); // Aqui você define sua lógica para gerar a URL
    this.subject = 'Entrou em contato com a ABICCA';
  }

  getDynamicRedirectUrl(): string {
    // Lógica para criar o link de redirecionamento
    return window.location.href; // Exemplo simples de adicionar um sufixo ao URL atual
  }

  onSubmit() {
    this.subject = `${this.nome}${this.subject}`;
  }

}
