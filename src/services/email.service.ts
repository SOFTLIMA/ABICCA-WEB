import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://abicca.com.br/API/index.php';

  constructor(private http: HttpClient) {}

  enviarEmail(emailData: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // Outros cabeçalhos que podem ser necessários, como Authorization, se aplicável:
      // 'Authorization': 'Bearer seu-token-aqui'
    });
    return this.http.post<any>(this.apiUrl, emailData, {headers: headers});
  }
}
