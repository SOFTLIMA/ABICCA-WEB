import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalvarFotoService {

  constructor(private http: HttpClient) {}

  uploadImagem(imagem: File): Observable<any> {
    // Cria um formulário de dados para enviar a imagem
    const formData = new FormData();
    formData.append('imagem', imagem);

    const headers = new HttpHeaders({
      // Outros cabeçalhos, se necessário
    });

    return this.http.post<any>(environment.apiSalvarFoto, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
