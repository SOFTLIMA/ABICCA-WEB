import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  isLoading = false;
  loginErro = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.loginErro = false;

    this.http.post<any>(environment.apiLogin, {
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token); // ou ID, dependendo do retorno
        this.router.navigate(['/painel']); // redireciona ao painel
      },
      error: () => {
        this.loginErro = true;
        this.isLoading = false;
      }
    });
  }
}
