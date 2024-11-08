import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  nextUrl: string = ''; // Variável para o valor do _next

  constructor() {}

  ngOnInit() {
    // Definindo a URL de redirecionamento dinamicamente
    this.nextUrl = this.getDynamicRedirectUrl(); // Aqui você define sua lógica para gerar a URL
  }

  getDynamicRedirectUrl(): string {
    // Lógica para criar o link de redirecionamento
    return window.location.href; // Exemplo simples de adicionar um sufixo ao URL atual
  }

}
