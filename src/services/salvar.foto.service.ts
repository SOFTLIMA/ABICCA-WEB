import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvarFotoService {

  private apiUrl = 'https://abicca.com.br/API/salvarfoto.php';

  constructor(private http: HttpClient) {}

  uploadImagem(imagem: File): Observable<any> {
    // Cria um formulário de dados para enviar a imagem
    const formData = new FormData();
    formData.append('imagem', imagem);

    const headers = new HttpHeaders({
      // Outros cabeçalhos, se necessário
    });

    // Verifica se está rodando localmente
    if (window.location.hostname === 'localhost') {
      const response = {
        file_path: `${imagem.name}`
      };
      return of(response);
    } else {
      // Se não for localhost, envia para a API remota
      return this.http.post<any>(this.apiUrl, formData, {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      });
    }
  }
}
